'use strict';
module.exports = (sequelize, DataTypes) => {
    const Champion = sequelize.define(
        'Champion',
        {
            cid: DataTypes.STRING,
            name: DataTypes.STRING,
            key: DataTypes.INTEGER,
            splash_img: DataTypes.STRING,
            loading_img: DataTypes.STRING,
            portrait_img: DataTypes.STRING
        },
        {}
    );
    Champion.associate = function(models) {
        // associations can be defined here
    };
    return Champion;
};
