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

                    calcDirection: function(mousePosition){
                        let direction = mousePosition.sub(this.node.position);
                        direction = direction.normalize();
                        return direction
                    },

                    calcRotation: function(direction){
                        let angulo = Math.atan2(direction.y, direction.x);
                        angulo = angulo * (180/Math.PI);
                        return angulo;
                    },

                    onLoad: function () {},

                });

module.exports = Character;