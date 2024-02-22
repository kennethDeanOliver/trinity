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

        this.cursors = undefined
    }
    preload(){
        this.load.image('background', 'images/background (placeholder).png')
        this.load.image('platform', 'images/platform (placeholder).png')
        this.load.spritesheet('Tulip', 'images/tulip & one-one.png', {frameWidth: 405, frameHeight: 570})
        this.load.spritesheet('Atticus', 'images/atticus.png', {frameWidth: 360, frameHeight: 300})
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
        this.physics.add.collider(this.companion, this.platforms)
        this.physics.add.overlap(this.player, this.companion)
        this.anims.create({
            key: 'a tourginia of corginia',
            frames: this.anims.generateFrameNumbers('Atticus', {start: 1, end: 4}),
            frameRate: 3,
            repeat: -1
        })

        this.cursors = this.input.keyboard.createCursorKeys()
    }
    update(){
        if (this.cursors.right.isDown){
            this.player.setVelocityX(30)
            this.player.anims.play('running away', true)
        }
        if (this.cursors.up.isDown){
            this.player.setVelocityY(-40)
        }
    }
}