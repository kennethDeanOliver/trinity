import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    constructor(){
        super('trinity-scene');
    }
    init(){
        this.platforms = undefined

        this.player = undefined
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
        this.physics.add.collider(this.player,this.platforms)

        this.player = this.physics.add.sprite(100, 468, 'Tulip').setScale(0.25)
        this.physics.add.sprite(200, 502, 'Atticus').setScale(0.25)
    }
    update(){

    }
}