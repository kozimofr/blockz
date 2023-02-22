import React, { createElement, useEffect } from "react"
import parse, { Element, domToReact } from 'html-react-parser'
import omit from "lodash/omit"

export interface HtmlContentPropsType {
  children: string;
}

export default function HtmlContent({
  children
}: HtmlContentPropsType): JSX.Element {
  useEffect(() => {
    var lazyload: any;
    var lazyloadImages: any;

    const loadImage = (image: any) => {
      image.src = image.dataset.src;
      if(image.dataset.srcset){
        image.srcset = image.dataset.srcset;
      }
      image.classList.add("loaded-lazy-image");
    }

    if ("IntersectionObserver" in window) {
      lazyloadImages = Array.prototype.slice.call(document.querySelectorAll("img[data-src]:not(.loaded-lazy-image)"));

      var imageObserver = new IntersectionObserver(function(entries, _) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            loadImage(image)
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function(image: any) {
        imageObserver.observe(image);
      });
    } else {
      var lazyloadThrottleTimeout: any;
      lazyloadImages = Array.prototype.slice.call(document.querySelectorAll("img[data-src]:not(.loaded-lazy-image)"));

      lazyload = () => {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(image: any) {
              if(image.offsetTop < (window.innerHeight + scrollTop)) {
                loadImage(image)
              }
          });
          if(lazyloadImages.length == 0) {
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }

      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }

    return () => {
      if(lazyload){
        window.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }
  }, [children])

  return (
    <>
    {parse(
      children
      .replace(/src=/g, "data-src=")
      .replace(/srcset=/g, "data-srcset=")
      .replace(/<table/g, "<div class=\"overflow-x-auto pb-2\"><table")
      .replace(/<\/table>/g, "</table></div>"),
      {
        replace: (domNode: any) => {
          if (
            domNode instanceof Element
            && !!domNode.attribs
            && !!domNode.attribs.onclick
          ) {
            return (
              createElement(
                domNode.name,
                {
                  ...omit(domNode.attribs, 'onclick'),
                  onClick: new Function(domNode.attribs.onclick)
                },
                domToReact(domNode.children)
              )
            )
          }
          return domNode
        }
      }
    )}
    </>
  )
}
