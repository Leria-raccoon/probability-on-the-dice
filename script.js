document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const containers = document.querySelectorAll('.container');
    const originalPositions = new Map();
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
        });

        element.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });

    // Обработчики для контейнеров
    containers.forEach(container => {
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d47878';
            this.style.backgroundColor = '#f2f3ec';
        });

        container.addEventListener('dragleave', function() {
            this.style.borderColor = '#aaa';
            this.style.backgroundColor = '#fafdb4';
        });

        container.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#aaa';
            this.style.backgroundColor = '#fafdb4';

            if (draggedItem) {
                if (this.firstChild) {
                    const oldElement = this.firstChild;
                    const originalParent = originalPositions.get(oldElement);
                    if (originalParent) {
                        originalParent.appendChild(oldElement);
                    }
                }
                this.appendChild(draggedItem);
            }
        });
    });

    // Функция для вычисления факториала
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Функция для расчета вероятности
    function calculateProbability(diceValues) {
        const counts = {};
        diceValues.forEach(num => {
            counts[num] = (counts[num] || 0) + 1;
        });

        let numerator = factorial(5);
        let denominator = 1;
        for (const num in counts) {
            denominator *= factorial(counts[num]);
        }

        const permutations = numerator / denominator;
        const probability = permutations / Math.pow(6, 5);
        return probability;
    }

     const result = document.getElementById('result')
    // Обработчик кнопки "Рассчитать вероятность"
    const vera = document.getElementById('vera');
    vera.addEventListener('click', () => {
        const diceValues = [];
        let allContainersFilled = true;

        containers.forEach(container => {
            if (container.children.length === 0) {
                allContainersFilled = false;
            } else {
                const value = parseInt(container.firstElementChild.dataset.id);
                diceValues.push(value);
            }
        });

        if (!allContainersFilled) {
            alert("Пожалуйста, заполните все контейнеры!");
            return;
        }

        const probability = calculateProbability(diceValues);
        const percent = (probability * 100).toFixed(4);
        
        // Выводим результат (можете изменить на свой способ вывода)
       
      result.textContent =  percent  + '%'
        console.log(`Комбинация: ${diceValues.join(', ')}`);
        console.log(`Вероятность: ${probability.toFixed(6)} (${percent}%)`);
    });

    // Кнопка сброса
    const del = document.getElementById('del');
    del.addEventListener('click', () => {
        originalPositions.forEach((parent, element) => {
            if (element.parentElement !== parent) {
                parent.appendChild(element);
            }

            result.textContent = ''
        });
    });

    // Остальной ваш код...
    const raba = document.getElementById('raba');
    const book = document.getElementById('book');
    const waw = document.getElementById('waw');
    const xistory = document.getElementById('xistory');
    const dalsh = document.getElementById('dalsh');
    const dalsh2 = document.getElementById('dalsh2');
    const com = document.getElementById ('com')
    const com2 = document.getElementById('com2')
    const com3 = document.getElementById('com3')

    dalsh.addEventListener('click', () => {
        raba.style.display = "none";
        book.style.display = 'block';
        dalsh2.style.display = 'block';
        dalsh.style.display = 'none';
        waw.style.display = 'block';
        com.style.display = 'none'
        com2.style.display = 'block'
        com3.style.display = 'block'
    });

    dalsh2.addEventListener('click', () => {
        book.style.display = 'none';
        waw.style.display = 'none';
        xistory.style.display = 'none';
        dalsh2.style.display = 'none';
        com2.style.display = 'none'
        com3.style.display = 'none'
    });
});