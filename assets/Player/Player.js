let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {
        speed: 200,
        maxHealth: 100,
        _health: 0,
        lifeBar: cc.ProgressBar,
        score: 0,
        label: cc.Label,
        _aim: cc.Vec2,
        _direction: cc.Vec2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {
        this._health = this.maxHealth;
        this.lifeBar.progress = 1;
        this._direction = new cc.v2(0,0);

        cc.director.getCollisionManager().enabled = true;

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.changeAim, this);
        canvas.on("mousedown", this.fire, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.startMovement, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.endMovement, this);
    },

    startMovement : function (event) {
        switch(event.keyCode){
            case cc.macro.KEY.w: 
                //UP
                this._direction = new cc.v2(this._direction.x, 1);
                break;
            case cc.macro.KEY.s: 
                //DOWN
                this._direction = new cc.v2(this._direction.x, - 1);
                break;
            case cc.macro.KEY.d: 
                //RIGHT
                this._direction = new cc.v2(1 , this._direction.y);
                break;
            case cc.macro.KEY.a: 
                //LEFT
                this._direction = new cc.v2(- 1, this._direction.y);
                break;
        }
    },

    endMovement : function () {
        switch(event.keyCode){
            case cc.macro.KEY.w: 
            case cc.macro.KEY.s: 
                this._direction = new cc.v2(this._direction.x, 0);
                break;
            case cc.macro.KEY.d: 
            case cc.macro.KEY.a: 
                this._direction = new cc.v2(0, this._direction.y);
                break;
        }
    },

    
    fire: function () {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node.parent;
        bullet.position = this.node.position;
        bullet.group = this.node.group;

        let bulletComponent = bullet.getComponent("Bullet");
        bulletComponent.direction = this._aim;
    },

    changeAim : function (event) {
        let mousePosition = event.getLocation();
        mousePosition = new cc.v2(mousePosition.x, mousePosition.y);
        
        this._aim = this.calcDirection(mousePosition);
        this.node.angle = this.calcRotation(this._aim);
    },

    

    damaged: function(dano){
        this._health -= dano;
        this.lifeBar.progress = this._health / this.maxHealth;
        if(this._health <= 0){
            cc.director.loadScene("GameOver");
        }
            
    },

    addScore: function(score){
        this.score += score;
        this.label.string = "Pontos: " + this.score;
    },

    start () {},

    update (dt) {
        let displacement = this._direction.mul(this.speed * dt);
        this.node.position = this.node.position.add(displacement);
    },
});
