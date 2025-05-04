const spaceship = document.getElementById("spaceship");
const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const starsContainer = document.getElementById("stars");

let spaceshipPosition = { x: 350, y: 500 }; // начальная позиция тарелки игрока
let targetPosition = { x: 100, y: 100 }; // начальная позиция преследуемой тарелки

let velocity = { x: 0, y: 0 };
let speed = 5;
let targetSpeed = 5; // Увеличиваем скорость движения цели (тарелки, за которой мы гонимся)

// Обработчики нажатия клавиш
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        velocity.x = -speed;
    } else if (e.key === "ArrowRight") {
        velocity.x = speed;
    } else if (e.key === "ArrowUp") {
        velocity.y = -speed;
    } else if (e.key === "ArrowDown") {
        velocity.y = speed;
    }
});

document.addEventListener("keyup", () => {
    velocity.x = 0;
    velocity.y = 0;
});

// Функция для генерации случайных звезд
function generateStars() {
    const starCount = 100; // Количество звезд

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Случайные размеры
        const size = Math.random() * 3 + 1; // от 1px до 4px
        star.style.width = size + "px";
        star.style.height = size + "px";

        // Случайные позиции на экране
        const x = Math.random() * gameArea.offsetWidth;
        const y = Math.random() * gameArea.offsetHeight;

        star.style.left = x + "px";
        star.style.top = y + "px";

        starsContainer.appendChild(star);
    }
}

// Функция для движения тарелки игрока
function moveSpaceship() {
    spaceshipPosition.x += velocity.x;
    spaceshipPosition.y += velocity.y;

    // Ограничиваем движение игрока в пределах игрового поля
    if (spaceshipPosition.x < 0) spaceshipPosition.x = 0;
    if (spaceshipPosition.x > gameArea.offsetWidth - spaceship.offsetWidth) spaceshipPosition.x = gameArea.offsetWidth - spaceship.offsetWidth;
    if (spaceshipPosition.y < 0) spaceshipPosition.y = 0;
    if (spaceshipPosition.y > gameArea.offsetHeight - spaceship.offsetHeight) spaceshipPosition.y = gameArea.offsetHeight - spaceship.offsetHeight;

    spaceship.style.left = spaceshipPosition.x + "px";
    spaceship.style.top = spaceshipPosition.y + "px";
}

// Функция для движения цели (тарелки, которую преследуем)
function moveTarget() {
    const randomDirectionX = Math.random() > 0.5 ? 1 : -1; // случайное направление по оси X
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1; // случайное направление по оси Y

    targetPosition.x += randomDirectionX * targetSpeed;
    targetPosition.y += randomDirectionY * targetSpeed;

    // Проверяем, чтобы цель не выходила за пределы игрового поля
    if (targetPosition.x < 0) targetPosition.x = 0;
    if (targetPosition.x > gameArea.offsetWidth - target.offsetWidth) targetPosition.x = gameArea.offsetWidth - target.offsetWidth;
    if (targetPosition.y < 0) targetPosition.y = 0;
    if (targetPosition.y > gameArea.offsetHeight - target.offsetHeight) targetPosition.y = gameArea.offsetHeight - target.offsetHeight;

    target.style.left = targetPosition.x + "px";
    target.style.top = targetPosition.y + "px";
}

// Главная функция обновления игры
function update() {
    moveSpaceship();
    moveTarget();
    requestAnimationFrame(update); // Запрашиваем следующий кадр
}

// Генерация звезд
generateStars();

// Запускаем игру
update();
