let Character =  cc.Class({
                    extends: cc.Component,
                    properties: {
                    bulletPrefab: cc.Prefab,
                    _direction: cc.Vec2,

                    },

                    fire: function () {
                        let bullet = cc.instantiate(this.bulletPrefab);
                        bullet.parent = this.node.parent;
                        bullet.position = this.node.position;
                        bullet.group = this.node.group;
                
                        let bulletComponent = bullet.getComponent("Bullet");
                        bulletComponent.direction = this._direction;
                    },

                    damaged: function(){},

                    onLoad: function () {},

                });

module.exports = Character;