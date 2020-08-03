const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './emails.sqlite'
});

try {
    sequelize.authenticate();
}catch (error) {
    console.error('Unable to connect to the database: ', error);
}

const Email = sequelize.define('Email', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    to_whom: {
        type: Sequelize.STRING,
        allowNull: false
    },

    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },

    content: {
        type: Sequelize.STRING,
        allowNull: false
    },

    attachment: {
        type: Sequelize.STRING,
        allowNull: true
    },

    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});


module.exports = Email;
