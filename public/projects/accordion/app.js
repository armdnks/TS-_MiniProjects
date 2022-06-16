"use strict";
const accordionData = [
    { question: 'The HyperText Markup Language', answer: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.' },
    { question: 'Cascading Style Sheets (CSS)', answer: 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.' },
    { question: 'JavaScript', answer: 'JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.' },
    { question: 'Hypertext Transfer Protocol', answer: 'The Hypertext Transfer Protocol (HTTP) is an application layer protocol in the Internet protocol suite model for distributed, collaborative, hypermedia information systems.' },
    { question: 'TypeScript', answer: 'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language.' },
];
const accordionContainer = document.querySelector('.accordion-container');
const accordionContent = accordionData
    .map((item) => {
    const { question, answer } = item;
    return /*html*/ `
    <div class="accordion-item">
      <div class="accordion-header">
        <h1 class="accordion-header-title">${question}</h1>
        <svg class="accordion-header-icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
        </svg>
      </div>
      <p class="accordion-description">${answer}</p>
    </div>
    `;
})
    .join('');
accordionContainer.insertAdjacentHTML('beforeend', accordionContent);
const accordionItem = document.querySelectorAll('.accordion-item');
accordionItem.forEach((item, index) => {
    const accordionHeader = item.querySelector('.accordion-header');
    accordionHeader.addEventListener('click', () => {
        item.classList.toggle('open');
        const accordionDescription = item.querySelector('.accordion-description');
        if (item.classList.contains('open')) {
            accordionDescription.style.height = `${accordionDescription.scrollHeight}px`;
        }
        else {
            accordionDescription.style.height = `0px`;
        }
        removeOpenClass(index);
    });
});
function removeOpenClass(currentIndex) {
    accordionItem.forEach((item, index) => {
        if (currentIndex != index) {
            item.classList.remove('open');
            const accordionDescription = item.querySelector('.accordion-description');
            accordionDescription.style.height = '0px';
        }
    });
}
