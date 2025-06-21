document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const containers = document.querySelectorAll('.container');
    const originalPositions = new Map(); // Хранилище исходных позиций
    let draggedItem = null;

    // Запоминаем исходные позиции
    elements.forEach(element => {
        originalPositions.set(element, element.parentElement);
    });

    // Обработчики для элементов 
    elements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            draggedItem = this;
            e.dataTransfer.setData('text/plain', this.dataset.id);

            setTimeout(() => this.classList.add('dragging'), 0);
            
            if (this.dataset.id) {
                console.log(this.dataset.id);
            } 
        });
        // dragstart - зажимаете элемент мышкой 

        element.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    // dragend -  отпускаете кнопку мыши 

    // Обработчики для контейнеров 
    containers.forEach(container => {
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
           this.style.borderColor = '#d47878';
            this.style.backgroundColor = '#f2f3ec';
        });
        // dragover - В ЗОНЕ КОНТЕЙНЕРА

        container.addEventListener('dragleave', function() {
            this.style.borderColor = '#aaa';
            this.style.backgroundColor = '#fafdb4';
        });
        // dragleave -  выходит из контейнера

        container.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#aaa';
            this.style.backgroundColor = '##fafdb4';
            console.log(container.id);
            // drop - БРОСАЕМ В КОНТЕЙНЕР

            if (draggedItem) {
                // книга которую я держу в руках {
                // Возвращаем старый элемент если есть
                if (this.firstChild) { // книга уже стоит на полке 
                // this - полка на которую можно поставить книгу 
                    const oldElement = this.firstChild;
                    const originalParent = originalPositions.get(oldElement);

                    // originalPositions - записная книжка, где указано, с какой полки взята каждая книга
                    if (originalParent) {
                        originalParent.appendChild(oldElement); // ставит книгу обратно
                    }
                }
                // Добавляем новый элемент
                // this- текущий контейнер 
                this.appendChild(draggedItem);
            }
        });
    });

    const allContainers = document.querySelectorAll('.container');

    const vera = document.getElementById('vera');
vera.addEventListener('click', () => {
    let allContainersFilled = true;
    const containerContents = {}; // Объект для хранения данных

    allContainers.forEach(container => {
        if (container.children.length === 0) {
            allContainersFilled = false;
            console.log(`Контейнер ${container.id} пуст!`);
            containerContents[container.id] = null;
        } else {
            // Получаем первый дочерний элемент (если у вас всегда по одному)
            const element = container.firstElementChild;
            console.log(`Контейнер ${container.id} содержит:`, {
                id: element.dataset.id,
                element: element
            });
            
            // Сохраняем информацию
            containerContents[container.id] = {
                id: element.dataset.id,
                html: element.outerHTML // или другие нужные данные
            };
        }
    });

    if (allContainersFilled) {
        console.log("Все контейнеры заполнены. Содержимое:", containerContents);
        // Теперь можно работать с данными:
        const elementIds = Object.values(containerContents).map(item => item.id);
        console.log("Все ID элементов:", elementIds);
    }
});
    // Кнопка сброса
    const del = document.getElementById('del');
    del.addEventListener('click', () => {
        originalPositions.forEach((parent, element) => { // контейнер, сам элемент 
            if (element.parentElement !== parent) {
                parent.appendChild(element);
                
            }
        });
    });





    
});