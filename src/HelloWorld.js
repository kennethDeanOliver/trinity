import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    constructor(){
        super('trinity-scene');
    }
    init(){
        this.platforms = undefined
        this.player = undefined
        this.companion = undefined
        this.obstacles = undefined

        this.cursors = undefined   
        this.grounded = true
    }
    preload(){
        this.load.image('background', 'images/background (placeholder).png')
        this.load.image('platform', 'images/platform (placeholder).png')
        this.load.image('obstacle', 'images/rock.png')
        this.load.spritesheet('Tulip', 'images/tulip & one-one.png', {frameWidth: 405, frameHeight: 540})
        this.load.spritesheet('Atticus', 'images/atticus.png', {frameWidth: 360, frameHeight: 270})
    }
    create(){
        this.add.image(400, 300, 'background')

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody()

        this.player = this.physics.add.sprite(100, 468, 'Tulip').setScale(0.25)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)
        this.anims.create({
            key: 'running away',
            frames: this.anims.generateFrameNumbers('Tulip', {start: 1, end: 4}),
            frameRate: 3,
            repeat: -1
        })

        this.companion = this.physics.add.sprite(200, 502, 'Atticus').setScale(0.25)
        this.companion.setCollideWorldBounds(true)
        this.physics.add.collider(this.companion, this.platforms)
        this.physics.add.overlap(this.player, this.companion)
        this.anims.create({
            key: 'a tourginia of corginia',
            frames: this.anims.generateFrameNumbers('Atticus', {start: 1, end: 4}),
            frameRate: 5,
            repeat: -1
        })

        this.obstacles = this.physics.add.group({
            key: 'rocks',
            repeat: 5,
            setXY: {x: 50, y: 0, stepX: 70}
        })

        this.cursors = this.input.keyboard.createCursorKeys()
    }
    update(){
        this.player.setVelocityX(50)
        this.player.anims.play('running away', true)
        this.companion.setVelocityX(80)
        this.companion.anims.play('a tourginia of corginia', true)
        if (this.cursors.up.isDown && this.grounded){
            this.player.setVelocityY(-200)
            this.grounded = false
            this.time.delayedCall(2000, this.endJump, [], this)
        }
    }
    endJump(){
        this.grounded = true
    }
}