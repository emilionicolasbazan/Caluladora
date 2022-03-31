const displayValorActual = document.querySelector('.valor-actual');
const displayValorAnterior = document.querySelector('.valor-anterior');
const botonesNumero = document.querySelectorAll('.numero');
const botonesOperador = document.querySelectorAll('.operador');


class Calculadora{
	suma(num1,num2){
		return num1+num2;
	}
	resta(num1,num2){
		if(num1==num2){
			return 0;
		} else {
			return num2-num1;
		}
		
	}
	multiplicacion(num1,num2){
		return num1*num2;
	}
	division(num1,num2){
		return num2/num1;
	}

}

 class Display{
	constructor(displayValorAnterior,displayValorActual){
		this.displayValorActual=displayValorActual;
		this.displayValorAnterior=displayValorAnterior;
		this.calculador=new Calculadora();
		this.tipoOperacion = undefined;
		this.valorActual='';
		this.valorAnterior='';
		this.signos ={
			suma:'+',
			resta:'-',
			division:'%',
			multiplicacion:'x'
		}

	}

	agregarNumero(numero){
		if(numero=="." && this.valorActual.includes('.'))return
		this.valorActual=this.valorActual+numero;
		this.imprimirValores();

	}

	imprimirValores(){
		this.displayValorActual.textContent=this.valorActual;
		this.displayValorAnterior.textContent=`${this.valorAnterior} ${this.signos[this.tipoOperacion] ||''}`;

	}

	borrar(){
		this.valorActual=this.valorActual.toString().slice(0,-1);
		this.imprimirValores();
	}

	borrarTodo(){
		this.valorActual='';
		this.valorAnterior='';
		this.tipoOperacion = undefined;
		this.imprimirValores();

	}

	calcular(){
		const valorActual = parseFloat(this.valorActual);
		const valorAnterior= parseFloat(this.valorAnterior);

		if(isNaN(valorActual)||isNaN(valorAnterior))return
			this.valorActual=this.calculador[this.tipoOperacion](valorActual,valorAnterior);
	}

	computar(tipo){
		this.tipoOperacion !== 'igual' && this.calcular();
		this.tipoOperacion=tipo;
		this.valorAnterior= this.valorActual||this.valorAnterior;
		this.valorActual='';
		this.imprimirValores();
	}
}


const display=new Display(displayValorAnterior,displayValorActual);

botonesNumero.forEach(boton=>{
	boton.addEventListener('click',()=>{
		display.agregarNumero(boton.innerHTML);

	});
});


botonesOperador.forEach(boton=>{
	boton.addEventListener('click',()=>{
		display.computar(boton.value);

	});
});
