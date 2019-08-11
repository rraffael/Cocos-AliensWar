let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {
        _target: cc.Node,
        speed: 50,
        cooldown: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._target = cc.find("hero");
        this.schedule(this.fire, this.cooldown);
    },

    changeDirection : function () {
        let direction = this._target.position.sub(this.node.position);
        direction = direction.normalize();
        this._direction = direction;
    },

    damaged: function(){
        this.node.destroy();
    },


    start () {},

    update (dt) {
        this.changeDirection();
        let displacement = this._direction.mul(this.speed * dt)
        this.node.position = this.node.position.add(displacement);
    },
});
