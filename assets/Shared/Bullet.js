cc.Class({
    extends: cc.Component,

    properties: {
        direction: cc.v2(0,0),
        speed: 600,
    },

    onCollisionEnter: function(other, me){
        let character = other.getComponent("Character");
        if(character != null){
            character.damaged(2);
        }
        else
            other.node.destroy();
        me.node.destroy();
    },

    start () {},

    update (dt) 
    {
        let displacement = this.direction.mul(this.speed * dt);
        this.node.position = this.node.position.add(displacement);
    },
});
