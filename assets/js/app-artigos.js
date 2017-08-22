jQuery(document).ready(function($) {
	var corpo = $('body');
	var titulosVolumes = [
		"Modulo 1",
		"Modulo 2",
		"Modulo 3",
		"Modulo 4"
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
		 if (corpo.hasClass('modulo'+(index+1) ) ) {
		 	clone = templateHeader.clone();
		 	clone.find('span.modulo').html(val);
		 	corpo.prepend(clone);
		 }
	});
});