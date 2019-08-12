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
        this._direction = this.calcDirection(this._target.position);
        this.node.angle = this.calcRotation(this._direction);

        // let direction = this._target.position.sub(this.node.position);
        // direction = direction.normalize();
        // this._direction = direction;

        // this._direction = this.calcDirection(this._target.position);
        // //let angulo = Math.atan2(direction.y, direction.x);
        // this.node.rotation = -angulo * (180/Math.PI);
    },

    damaged: function(){
        let player = this._target.getComponent("Player");
        player.addScore(10)

        this.node.destroy();
    },


    start () {},

    update (dt) {
        this.changeDirection();
        let displacement = this._direction.mul(this.speed * dt)
        this.node.position = this.node.position.add(displacement);
    },
});
