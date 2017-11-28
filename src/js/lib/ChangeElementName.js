export default function ChangeElementName(elements,attribute,i) {
  Array.from(elements).forEach((elem) => {
    let oldAttr = elem.getAttribute(attribute) || toString(elem.getAttribute(attribute) );
    let oldstring = oldAttr.substring(0,oldAttr.indexOf('[')+1);
    let newstring = oldstring + i + ']';
    elem.setAttribute(attribute,newstring);
  });
}
