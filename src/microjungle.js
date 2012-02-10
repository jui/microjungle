var microjungle = function(template) {
    var d = document;

    // they just doing their job.
    function monkeys(what, who) {
        var l = what.length;

        for (var i = 0; i < l; i++) {
            var j = what[i];

            if (j) {
                if (typeof j == 'string') {
                    //who.appendChild(d.createTextNode(j));
                    who.innerHTML += j;
                } else {
                    if (typeof j[0] == 'string') {
			var classes = null; var ids = null; var tag = null;
			var en = j.shift();
			var c = en.charAt(0);
			if ((c === '.' || c === '#' || c === '%')) {
			    classes = en.match(/\.[^\.#]+/g);
			    ids = en.match(/#[^\.#]+/g);
			    tag = en.match(/^%([^\.#]+)/g);
			    tag = tag ? tag[0].substr(1) : 'div';
			} else {
			    tag = en;
			}

                        var el = d.createElement(tag),			    
                        attrs = {}.toString.call(j[0]) === '[object Object]' && j.shift(), k;
			
			if (classes) {
			    for (k in classes) classes[k] = classes[k].substr(1);
			    el.setAttribute('class',classes.join(' '));
			}

			if (ids) {
			    for (k in ids) ids[k] = ids[k].substr(1);
			    el.setAttribute('id',ids.join(' '));
			}

                        if (attrs) {
                            for(k in attrs) {
                                attrs[k] && el.setAttribute(k, attrs[k]);
                            }
                        }

                        who.appendChild(monkeys(j, el));
                    } else if (j.nodeType === 11) {
                        who.appendChild(j);
                    } else {
                        monkeys(j, who);
                    }
                }
            }
        }

        return who;
    };

    return monkeys(template, d.createDocumentFragment());
};
