(function($) {
    
    $.fn.cookieEU = function(options) {
        var defaults = {
            defaultClass: 'cookieEU',
            message: 'Este site utiliza cookies para garantir a melhor experiência de navegação. Ao continuar a navegar no nosso site aceita a utilização de cookies.',
            buttonText: 'Não mostrar esta mensagem novamente',
            cookieDefaults: {
                domain: '',
                expirationDays: null
            }            
		}, 

        opts = {};	
        $.extend(opts, defaults, options);

        /**
         * Remove cookie (with name) from browser
         * 
         * @param string name
         * @return 
         */
        removeCookie = function(name) {
            this.addCookie(name, "", -1);
        };

        /**
         * Add cookie (with name and value) to browser
         * 
         * @param string name
         * @param string value
         * @param int days
         * @return 
         */
        addCookie = function(name, value, domain, days) {
            var expires, d;

			if (!days) { 
                expires = "";
            } else {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = ";expires=" + date.toGMTString();
			}

            if (!domain) { 
                d = "";
            } else {
                d = ";domain=" + domain;
            }

            document.cookie = name + "=" + value + expires + ";path=/" + d;  
        };
        
        /**
         * Read cookie (with name) from browser 
         * and return value of cookie
         * 
         * @param string name
         * @return object value
         */
        readCookie = function(name) {
            var nameEQ = name + "=",
                ca = document.cookie.split(';');

			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];

				while (c.charAt(0) == ' ') {
					c = c.substring(1, c.length);
				}
				
				if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length, c.length); }
			}

			return null;
        };			

        return this.each(function() {
            var $this = $(this);

            var $element = $('<div class="' + opts.defaultClass  + '">' +
                '    <p>' + opts.message +'</p>' +
                '    <input type="button" id="closeButtonCookieEU" value="' + opts.buttonText + '"  />' +
                '</div>');

            $element.find("input[type='button']").click(function() {
                var $parent = $(this).parent();
                $parent.hide({
                    duration: 0,                    
                    easing: 'swing',
                    complete: function() {
                        $this.css('paddingTop', 'inherit');                        
                        
                        if (opts.cookieDefaults.expirationDays == null) {
                            addCookie('cookieEU', 'accepted', opts.cookieDefaults.domain);
                        } else {
                            addCookie('cookieEU', 'accepted', opts.cookieDefaults.domain, opts.cookieDefaults.expirationDays);
                        }                        
                    }
                });
            });

            if (readCookie('cookieEU') == null || readCookie('cookieEU') != 'accepted') {
                $this.prepend($element);

                if ($element.is(':visible')) {
                    $this.css('paddingTop', $element.height());
                }   
            }
		});	
    }

}(jQuery));