let circles = [];
let iframe;
let menu; // 將選單變數提升到全域

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // 建立 40 個圓，隨機位置、大小和顏色
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 100),
      color: [random(255), random(255), random(255)],
    });
  }

  // 建立 iframe 並設置樣式
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('opacity', '0.2');
  iframe.style('z-index', '2'); // 第二層
  iframe.hide(); // 初始隱藏

  // 建立選單
  createMenu();
  menu.hide(); // 初始隱藏選單
}

function draw() {
  background('#8ecae6');

  // 動畫效果
  for (let circle of circles) {
    circle.size = map(mouseX, 0, width, 10, 120);

    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size, circle.size);
  }

  // 根據滑鼠的 y 座標顯示或隱藏選單
  if (mouseY < 250) {
    menu.show();
  } else {
    menu.hide();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 建立選單
function createMenu() {
  menu = createDiv(); // 將選單存入全域變數
  menu.addClass('menu');
  menu.style('position', 'absolute');
  menu.style('top', '10px'); // 距離畫布頂部 10px
  menu.style('right', '10px'); // 距離畫布右側 10px
  menu.style('z-index', '3'); // 最上層
  menu.style('display', 'flex'); // 使用 flex 排列
  menu.style('flex-direction', 'row'); // 水平排列
  menu.style('gap', '20px'); // 選單項目之間的間距為 20px

  // 主選單項目
  const items = [
    { label: '首頁', link: '#' },
    { label: '自我介紹', link: '#' },
    { label: '作品集', subItems: [ // 子選單
        { label: '第一周', link: 'https://cfchengit.github.io/20250304/' },
        { label: '第二周', link: 'https://cfchengit.github.io/2025_mid/' },
        { label: '第三周', link: 'https://hackmd.io/@cfchen/S1xdlbl0J' },
        { label: '第四周', link: 'https://example.com/' },
      ] 
    },
    { label: '聯絡我們', link: '#' },
  ];

  for (let item of items) {
    const menuItem = createDiv(item.label);
    menuItem.addClass('menu-item');
    menuItem.style('padding', '5px 10px');
    menuItem.style('background', '#e76f51'); // 背景色為 #e76f51
    menuItem.style('color', '#000000'); // 文字顏色為 #000000
    menuItem.style('font-size', '18px'); // 文字大小為 18px
    menuItem.style('font-family', 'Arial'); // 文字型體為 Arial
    menuItem.style('border-radius', '5px');
    menuItem.style('cursor', 'pointer');
    menuItem.mouseOver(() => menuItem.style('color', '#a3b18a')); // 滑鼠移到上面時文字顏色變為 #a3b18a
    menuItem.mouseOut(() => menuItem.style('color', '#000000')); // 滑鼠移開時文字顏色恢復為 #000000

    // 如果有子選單
    if (item.subItems) {
      const subMenu = createDiv();
      subMenu.style('position', 'absolute');
      subMenu.style('top', '100%');
      subMenu.style('left', '0');
      subMenu.style('background', '#ffffff');
      subMenu.style('border', '1px solid #000000');
      subMenu.style('display', 'none'); // 初始隱藏
      subMenu.style('z-index', '4'); // 子選單層級更高

      for (let subItem of item.subItems) {
        const subMenuItem = createDiv(subItem.label);
        subMenuItem.style('padding', '5px 10px');
        subMenuItem.style('cursor', 'pointer');
        subMenuItem.style('color', '#000000'); // 子選單文字顏色
        subMenuItem.style('font-size', '16px'); // 子選單文字大小
        subMenuItem.style('font-family', 'Arial'); // 子選單文字型體
        subMenuItem.mouseOver(() => subMenuItem.style('color', '#a3b18a')); // 滑鼠移到上面時文字顏色變為 #a3b18a
        subMenuItem.mouseOut(() => subMenuItem.style('color', '#000000')); // 滑鼠移開時文字顏色恢復為 #000000
        subMenuItem.mousePressed(() => {
          iframe.attribute('src', subItem.link); // 設置 iframe 的連結
          iframe.show(); // 顯示 iframe
        });
        subMenu.child(subMenuItem);
      }

      menuItem.child(subMenu);

      // 顯示/隱藏子選單
      menuItem.mouseOver(() => subMenu.style('display', 'block'));
      menuItem.mouseOut(() => subMenu.style('display', 'none'));
    } else {
      menuItem.mousePressed(() => {
        iframe.attribute('src', item.link); // 設置 iframe 的連結
        iframe.show(); // 顯示 iframe
      });
    }

    menu.child(menuItem);
  }
}
