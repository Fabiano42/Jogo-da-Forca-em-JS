window.onload = function(){
	
	//salvar palavra
	document.getElementById('btn_pesq_letra').style.display = 'none';
	var botao = document.getElementById("btn_iniciar");
	botao.onclick = function(){
		document.getElementById('btn_pesq_letra').style.display = 'inline';
		var erros=0;
		var acertos=0;
		var palavra_us;
		var imagem = document.getElementById('forca');	
		imagem.src="img/"+erros+".png";
		document.getElementById("letra").innerHTML = "";
		document.getElementById("letras_palavra").innerHTML = "";
		document.getElementById("letras_erradas").innerHTML = "";
				
		palavra = prompt("Digite uma palavra: ");	 
		while (palavra=="") {
			palavra = prompt("Digite uma palavra: ");
		}
		
		var palavra= palavra.toUpperCase();
		alert(palavra);
		var palavra_certa=palavra;
		var form_letras = document.getElementById("letra");
		var novo_input_letras= document.createElement("input");
		novo_input_letras.type="text";
		novo_input_letras.value="";
		novo_input_letras.size="1";
		//novo_input_letras.maxlength="1";
		novo_input_letras.name="campo";
		novo_input_letras.id="letra_jogador";
		form_letras.appendChild(novo_input_letras);

		var formulario = document.getElementById("letra");
		formulario.campo.addEventListener("keypress", mascaraLetra);
		function mascaraLetra(event){
			if (event.keyCode < 65 || event.keyCode > 122 || this.value.length>0) {
				event.preventDefault();
			}
		}

		for(i = 0; i < palavra.length; i++){ //cria novos inputs no html a partir do número de caracteres 
			var form = document.getElementById("letras_palavra");
			var novo_input= document.createElement("input");
			novo_input.type="text";
			novo_input.value="";
			novo_input.size="1";
			novo_input.maxlength="1";
			novo_input.disabled= "disabled";
			form.appendChild(novo_input);
		}
			
		//Pesquisa a letra na palavra
		var botao_letra = document.getElementById("btn_pesq_letra");
		botao_letra.onclick = function(){
			
			var  letra_jogador = document.getElementById("letra_jogador").value;
			letra_jogador= letra_jogador.toUpperCase();

			if (letra_jogador != "") { //

				var pesquisa = palavra.match(letra_jogador);

				if (pesquisa==null) {

					var letras_erradas = letra_jogador;
				
					erros++;
					document.getElementById("letras_erradas").innerHTML += letras_erradas;
					imagem.src= "img/"+erros+".png";
				
					if (erros==6){
						novo_input_letras.disabled= "disabled";
						alert("VOCÊ PERDEU! " + "\n\n" + "A palavra certa era: " + palavra_certa);
					}
				}

				//procurar por mais de uma ocorrência da letra na palavra
				while(pesquisa!=null){
				var pos_letra=palavra.search(letra_jogador);
				pos_letra++;
				var elementos = document.getElementsByTagName("input");
				elementos[pos_letra].value=letra_jogador; 
				palavra=palavra.replace(letra_jogador,'0'); //substui a letra encontrada
				acertos++;
					if (acertos==palavra.length) {
						alert("VOCÊ VENCEU!");
						novo_input_letras.disabled= "disabled";
					}
				pesquisa = palavra.match(letra_jogador);
				}	
			}

			else{
				alert("Digite uma letra por favor!"); //

			}	
			
			document.getElementById("letra_jogador").value = ""; 
		} 
	}		
}