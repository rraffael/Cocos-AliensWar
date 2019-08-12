let Character =  cc.Class({
                    extends: cc.Component,
                    properties: {
                    bulletPrefab: cc.Prefab,
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