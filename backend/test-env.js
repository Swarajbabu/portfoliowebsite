require('dotenv').config();
console.log('Username:', process.env.ADMIN_USERNAME, 'Length:', process.env.ADMIN_USERNAME?.length);
console.log('Password:', process.env.ADMIN_PASSWORD, 'Length:', process.env.ADMIN_PASSWORD?.length);
console.log('Admin user from env:', process.env.ADMIN_USERNAME + '|' + process.env.ADMIN_PASSWORD);
console.log('Raw hex username:', Buffer.from(process.env.ADMIN_USERNAME || '').toString('hex'));
console.log('Raw hex password:', Buffer.from(process.env.ADMIN_PASSWORD || '').toString('hex'));
