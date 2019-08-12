let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {
        _target: cc.Node,
        speed: 50,
        cooldown: 1,
        _direction: cc.Vec2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._target = cc.find("hero");
        this.schedule(this.fire, this.cooldown);
    },

    changeDirection : function () {
        this._direction = this.calcDirection(this._target.position);
        this.node.angle = this.calcRotation(this._direction);
    },

    damaged: function(){
        let player = this._target.getComponent("Player");
        player.addScore(10)

        this.node.destroy();
    },

    fire: function () {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent;
        bullet.position = this.node.position;
        bullet.group = this.node.group;

        let bulletComponent = bullet.getComponent("Bullet");
        bulletComponent.direction = this._direction;
    },

    start () {},

    update (dt) {
        this.changeDirection();
        let displacement = this._direction.mul(this.speed * dt)
        this.node.position = this.node.position.add(displacement);
    },
});
