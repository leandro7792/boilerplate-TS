/* eslint-disable no-underscore-dangle */
import DigestFetch from 'digest-fetch';

class Hikvision {
  constructor({ ip, username, password }) {
    this._ip = ip;
    this._api = new DigestFetch(username, password);
  }

  _responseValidate(response) {
    if (!response.ok) {
      const { status } = response;

      if (status === 401) {
        throw new Error(
          `Houve um erro de autenticação no dispositivo de ip ${this.ip}`
        );
      }
    }

    return response.text().then(text => (text ? JSON.parse(text) : {}));
  }

  async storeEntity(entity) {
    const { id, name, type, faceURL } = entity;

    const authorization = { enable: type === 'visitor' };

    authorization.beginTime = authorization.enable
      ? entity.authorization.start
      : '1970-01-01T00:00:00';
    authorization.endTime = authorization.enable
      ? entity.authorization.end
      : '2037-12-31T23:59:59';

    await this.removeEntity(id);

    const userInfo = await this._api.fetch(
      `http://${this._ip}/ISAPI/AccessControl/UserInfo/SetUp?format=json`,
      {
        method: 'put',
        body: JSON.stringify({
          UserInfo: {
            employeeNo: `${id}`,
            name,
            userType: type, // 'normal', 'visitor', 'blackList'
            Valid: {
              enable: authorization.enable, // false = permanent, true = período abaixo.
              beginTime: authorization.beginTime,
              endTime: authorization.endTime,
              timeType: 'local',
            },
            belongGroup: '',
            password: '',
            doorRight: '1',
            RightPlan: [
              {
                doorNo: 1,
                planTemplateNo: '1',
              },
            ],
            maxOpenDoorTime: 0,
            openDoorTime: 0,
            roomNumber: 0,
            floorNumber: 0,
            doubleLockRight: false,
            localUIRight: false,
            userVerifyMode: 'face',
            checkUser: true,
          },
        }),
        Headers: { 'Content-Type': 'application/json' },
      }
    );

    const faceInfo = await this._api.fetch(
      `http://${this._ip}/ISAPI/Intelligent/FDLib/FaceDataRecord?format=json`,
      {
        method: 'post',
        body: JSON.stringify({
          faceURL,
          faceLibType: 'blackFD',
          FDID: '1',
          FPID: `${id}`,
        }),
        Headers: { 'Content-Type': 'application/json' },
      }
    );

    // valida se a imagem subiu
    this._responseValidate(faceInfo);

    return this._responseValidate(userInfo);
  }

  async removeEntity(entity_id) {
    const endpoint = `http://${this._ip}/ISAPI/AccessControl/UserInfoDetail/Delete?format=json`;

    const response = await this._api.fetch(endpoint, {
      method: 'put',
      body: JSON.stringify({
        UserInfoDetail: {
          mode: 'byEmployeeNo',
          EmployeeNoList: [
            {
              employeeNo: `${entity_id}`,
            },
          ],
        },
      }),
      Headers: { 'Content-Type': 'application/json' },
    });

    return this._responseValidate(response);
  }
}

export default Hikvision;
