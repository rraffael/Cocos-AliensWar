let Character = require("Character");

cc.Class({
    extends: Character,

    properties: {
        _acceleration: false,
        speed: 200,
        maxHealth: 100,
        _health: 0,
        lifeBar: cc.ProgressBar,
        score: 0,
        label: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {
        this._health = this.maxHealth;
        this.lifeBar.progress = 1;

        cc.director.getCollisionManager().enabled = true;

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.changeDirection, this);
        canvas.on("mousedown", this.fire, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyPress, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyRelease, this)
    },

    keyPress : function (event) {
        if(event.keyCode == cc.macro.KEY.d){
            this._acceleration = true
        }
    },

    keyRelease : function () {
        this._acceleration = false
    },

    changeDirection : function (event) {
        let mousePosition = event.getLocation();
        mousePosition = new cc.v2(mousePosition.x, mousePosition.y);
        
        this._direction = this.calcDirection(mousePosition);
        this.node.angle = this.calcRotation(this._direction);

        // let direction = mousePosition.sub(this.node.position);
        // this._direction = direction.normalize();

        // let angulo = Math.atan2(direction.y, direction.x);
        // this.node.rotation = -angulo * (180/Math.PI);
    },

    damaged: function(dano){
        this._health -= dano;
        this.lifeBar.progress = this._health / this.maxHealth
        if(this._health <= 0){
            this.node.destroy();
            cc.director.loadScene("GameOver");
        }
            
    },

    addScore: function(score){
        this.score += score;
        console.log(this.score)
        console.log(this.label)
        this.label.string = "Pontos: " + this.score;
    },

    start () {},

    update (dt) {
        if(this._acceleration){
            let displacement = this._direction.mul(this.speed * dt)
            this.node.position = this.node.position.add(displacement);
        }
    },
});
