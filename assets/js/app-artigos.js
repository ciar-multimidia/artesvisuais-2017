jQuery(document).ready(function($) {
	var corpo = $('body');
	var titulosVolumes = [
		"EIXO 1",
		"EIXO 2",
		"EIXO 3",
		"EIXO 4"
	];

	var templateHeader = $('\
		<header id="topo">\
			<div class="container">\
				<a href="../../index.html" class="marca">\
					<span class="modalidade">Licenciatura em</span>\
					<span class="curso-nome">Artes visuais</span>\
					<span class="livro"></span>\
				</a>\
				<a href="sumario.html" class="sumario"><span class="menu"><span>&mdash;</span><span>&mdash;</span><span>&mdash;</span></span>Sumário</a>\
			</div>\
		</header>\
	');

	$.each(titulosVolumes, function(index, val) {
		 if (corpo.hasClass('livro'+(index+1) ) ) {
		 	clone = templateHeader.clone();
		 	clone.find('span.livro').html(val);
		 	corpo.prepend(clone);
		 }
	});
});