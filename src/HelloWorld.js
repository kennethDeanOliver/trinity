import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    constructor(){
        super('trinity-scene');
    }
    init(){
        this.player = undefined
        this.companion = undefined

        this.base = undefined
        this.platforms = undefined
        this.obstacles = undefined

        this.cursors = undefined   
        this.grounded = true
    }
    preload(){
        this.load.image('background', 'images/background.png')
        this.load.image('base', 'images/base.png')
        this.load.image('platform', 'images/platform.png')
        this.load.image('obstacle', 'images/rock.png')
        this.load.spritesheet('Tulip', 'images/tulip & one-one.png', {frameWidth: 405, frameHeight: 540})
        this.load.spritesheet('Atticus', 'images/atticus.png', {frameWidth: 360, frameHeight: 270})
    }
    create(){
        this.add.image(400, 300, 'background')

        this.base = this.physics.add.staticGroup()
        this.base.create(400, 568, 'base').setScale(2).refreshBody()
        // this.platforms = this.physics.add.staticGroup()
        // this.platforms.create(400, 568, 'platform').setScale(2).refreshBody()

        this.obstacles = this.physics.add.group({
            key: 'obstacle',
            repeat: 5,
            setXY: {x: 200, y: 470, stepX: 100},
            setScale: {x: 0.5, y: 0.5}
        })
        this.physics.add.collider(this.obstacles, this.base)

        this.player = this.physics.add.sprite(100, 468, 'Tulip').setScale(0.25)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.base)
        this.physics.add.collider(this.obstacles, this.player)
        this.anims.create({
            key: 'running away',
            frames: this.anims.generateFrameNumbers('Tulip', {start: 1, end: 4}),
            frameRate: 3,
            repeat: -1
        })

        this.companion = this.physics.add.sprite(200, 502, 'Atticus').setScale(0.25)
        this.companion.setCollideWorldBounds(true)
        this.physics.add.collider(this.companion, this.base)
        this.physics.add.overlap(this.player, this.companion)
        this.anims.create({
            key: 'a tourginia of corginia',
            frames: this.anims.generateFrameNumbers('Atticus', {start: 1, end: 4}),
            frameRate: 5,
            repeat: -1
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