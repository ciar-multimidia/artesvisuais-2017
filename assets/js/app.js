jQuery(document).ready(function($) {

	if ($('#rodape').attr('data-bt-subir') !== 'false') {
		$('#rodape > .container').append(
			'<div class="botoes-fixos">\
				<div class="posrel">\
					<a href="#subir" class="btn-subir"></a>\
					<a href="" class="btn-imprimir"></a>\
				</div>\
			</div>'		
			
			);
		$('a.btn-subir').on('click', function(event){
			event.preventDefault();
		  $('html, body').animate({scrollTop:0},1100);
		  return false;
		});	

		$('.btn-imprimir').on('click', function(event) {
			event.preventDefault();
			$(window)[0].print();
		});
	}

	


	var notasrodape = $('.nota-rodape');
	var btrodape = $('.numero-rodape');

	// função que define as posições das notas de rodapé.
	var attPosRodape = function(){
		notasrodape.each(function(index, el) {
			var datanumero = $(el).attr('data-numero');
			var btEquivalente = btrodape.filter('[data-numero=\''+datanumero+'\']');
			var alturaRodape = $(el).height();
			var topCalculado = btEquivalente.position().top - alturaRodape/2;



			var novoTop = (function(){

				if (topCalculado < 0) {
					return 1;
				} else if(topCalculado + alturaRodape > $(el).closest('article').height() ){
					return ($(el).closest('article').height() - alturaRodape - 10);
				} else{
					return topCalculado;
				}
				
			})();
			$(el).css('top', novoTop);

		});	
	}
	



	var rodapeAtual = 0;

	notasrodape.each(function(index, el) {
		$(el).children().wrapAll('<div class="posrel"><div class="texto"></div></div>');
		$(el).find('.posrel').prepend('<p class="numero-equivalente"></p><button class="fechar"></button>');
		$(el).find('.numero-equivalente').text($(el).attr('data-numero'));
		$(el).find('button.fechar').on('click', function(event) {
			$(this).closest('.nota-rodape').removeClass('visivel');
			setTimeout(function(){
				$(this).closest('.nota-rodape').removeClass('db');
				rodapeAtual = 0;
				
			},400);
		});

	});	

	attPosRodape();



	// Atualizar posições sempre que o usuário redimensionar a janela do navegador.
	$(window).on('resize', function(event) {
		attPosRodape();
	});

	btrodape.on('click', function(event) {

		var numeroClicado = parseInt( $(this).attr('data-numero') );

		if (rodapeAtual !== 0) {

			var rodapeAFechar = notasrodape.filter('[data-numero=\''+rodapeAtual+'\']');
			rodapeAFechar.removeClass('visivel');
			setTimeout(function(){
				rodapeAFechar.removeClass('db');
				rodapeAFechar = aRevelar;

			},400);
		}

		var aRevelar = notasrodape.filter('[data-numero=\''+numeroClicado+'\']');

		if (numeroClicado !== rodapeAtual) {
			aRevelar.addClass('db');
			setTimeout(function(){
				aRevelar.addClass('visivel');
			},20);

			rodapeAtual = parseInt( $(this).attr('data-numero') );
		} else{
			rodapeAtual = 0;
		}
	});

	var figuras = $('article figure');

	// figuras.on('click', function(event) {
	// 	$(this).toggleClass('maior');
	// });

	$.fancybox.defaults.transitionEffect = "slide";

	figuras.each(function(index, el) {
		if ($(el).prev().is(':not(figure)')) {
			if ($(el).next().is('figure')) {
				$(el).prev().nextUntil(':not(figure)').wrapAll('<section class="galeria"></section>');
			}
			else{
				var imgTag = $(el).find('img');
				var captionTag = $(el).find('figcaption');
				var ratio = imgTag.width()/imgTag.height();
				if (ratio < 0.8) {
					$(el).addClass('vertical');
				}

				var anchorWrap = $('<a></a>');
				anchorWrap.attr({
					'href': imgTag.attr('src'),
					'data-fancybox': '',
					'data-caption': captionTag.html()
				});
				$(el).wrap(anchorWrap);
			}
		} else{

		}
	});

	$('section.galeria').each(function(index, el) {

		$(el).children('figure').each(function(index2, el2) {
			var anchorWrap = $('<a></a>');
			anchorWrap.attr({
				'href': $(el2).find('img').attr('src'),
				'data-fancybox': 'galeria-'+(index+1),
				'data-caption': $(el2).find('figcaption').html()
			});
			$(el2).wrap(anchorWrap);
		});
	});


	// Botao que revela os minicurriculos
	$('.autores').find('.bt-leia-mais').on('click', function(event) {
		event.preventDefault();
		$(this).closest('.autores').addClass('leia-mais');
	});
});