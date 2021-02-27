const base_path = process.env.NODE_ENV === 'development' ? './src' : './dist';
const type_file = process.env.NODE_ENV === 'development' ? '*.ts' : '*.js';

module.exports = {
  "type": "sqlite",
  "database": "./database.sqlite",
  "migrations": [
    `${base_path}/database/migrations/${type_file}`
  ],
  "cli": {
    "migrationsDir": `${base_path}/database/migrations`
  },
  "entities": [
    `${base_path}/models/**/${type_file}`
  ]
}

