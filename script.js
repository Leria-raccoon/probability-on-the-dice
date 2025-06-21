document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const containers = document.querySelectorAll('.container');
    let draggedItem = null;

    // Добавляем обработчики для элементов
    elements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            draggedItem = this;
            e.dataTransfer.setData('text/plain', this.dataset.id);
            setTimeout(() => {
                this.classList.add('dragging');
            }, 0);
        });

        element.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });

    // Добавляем обработчики для контейнеров
    containers.forEach(container => {
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'red';
        });

        container.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '#f8f8f8';
        });

        container.addEventListener('dragleave', function() {
            this.style.borderColor = '#aaa';
            this.style.backgroundColor = 'white';
        });

        container.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#aaa';
            this.style.backgroundColor = 'white';
            
            if (draggedItem && !this.contains(draggedItem)) {
                this.appendChild(draggedItem);
            }
        });
    });
});