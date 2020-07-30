'use strict';
module.exports = (sequelize, DataTypes) => {
    const MatchGroup = sequelize.define(
        'MatchGroup',
        {
            type: DataTypes.STRING,
            team1_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Teams',
                    key: 'id'
                }
            },
            team2_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Teams',
                    key: 'id'
                }
            },
            team1_score: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            team2_score: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            status: {
                type: DataTypes.ENUM,
                values: ['expected', 'progress', 'end'],
                defaultValue: 'expected'
            }
        },
        {}
    );
    MatchGroup.associate = function(models) {
        MatchGroup.hasMany(models.Match);
        MatchGroup.belongsTo(models.Tournament, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return MatchGroup;
};
