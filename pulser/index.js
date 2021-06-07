window.Pulse = class pulse{

    constructor(attributes){

        this.circle = document.createElement('div');
        this.circle.classList.add('outer-circle');
        this.radius = attributes.radius || '40px';
        this.color = attributes.color || 'black';
        this.duration = attributes.duration || 1000;
        this.circle.style.width = `${this.radius}px`;
        this.circle.style.height = `${this.radius}px`
        this.circle.style.background = `${this.color}`;
        this.outerCircle = document.createElement('div');
        this.outerCircle.classList.add('pulse-circle');
        this.outerCircle.style.width = `${this.radius}px`;
        this.outerCircle.style.height = `${this.radius}px`;
        this.outerCircle.style.background = `${this.color}`;

        this.newXAccess = 0;
        this.newYAccess = 0;

        this.circle.appendChild(this.outerCircle);
        document.body.prepend(this.circle);
        this.createPulseEffect();
        window.onmousemove = this.changePosition.bind(this);
    }

    createPulseEffect(){
        let pulse = new KeyframeEffect(
            this.outerCircle,
            [
                { opacity: '0',
                    height: `${this.radius}px`,
                    width: `${this.radius}px` },
                {        opacity: '.51'
                },
                { opacity: '0',
                    width: `${this.radius * 1.8}px`,
                    height: `${this.radius * 1.8}px` }
            ],
            {duration: this.duration}
        );

        let time = new Animation(pulse, document.timeline);

        setInterval(function (_) {
            time.play();
        },200);
    }
    changePosition(event){
        this.newXAccess = event.clientX;
        this.newYAccess = event.clientY + window.scrollY;

        this.checkMousePosition(event);

        this.render();
    }

    checkMousePosition(event){
        if(this.isMouseInside(event)){
            this.circle.style.display = 'block';
            return;
        }
        this.circle.style.display = 'none';
    }

    isMouseInside(event){
        return (!(event.clientY <= 30 || event.clientY >= window.innerHeight - 30)
            && !(this.newXAccess <= 30 || this.newXAccess >= window.innerWidth - 30));

    }

    render(){
        this.circle.style.left = `${this.newXAccess}px`;
        this.circle.style.top = `${this.newYAccess}px`;

    }


}

;