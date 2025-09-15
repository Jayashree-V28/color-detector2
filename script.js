// ✅ Store registered users in memory
let users = [];
let currentUser = null;
let detectedColors = [];

// ✅ Utility function to show a page
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// ✅ Login function
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long!");
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    showPage("color-page");
  } else {
    alert("Invalid email or password!");
  }
}

// ✅ Register function
function register() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (email === "" || password === "") {
    alert("Please fill in both fields!");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(u => u.email === email);

  if (userExists) {
    alert("User already registered! Please login.");
    showPage("login-page");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Please login.");
  showPage("login-page");
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(u => u.email === email && u.password === password);

  if (validUser) {
    showPage("color-page");
  } else {
    alert("Invalid username or password.");
  }
}


// ✅ Logout function
function logout() {
  currentUser = null;
  showPage("logout-page");
}

// ✅ Back to Login function
function backToLogin() {
  showPage("login-page");
}

// ✅ Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ✅ Color Detection Logic
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function loadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
  img.src = URL.createObjectURL(file);
}

// ✅ Detect color on canvas click
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const r = pixel[0], g = pixel[1], b = pixel[2];

  let colorName = getNearestColorName(r, g, b);
  let rgb = `rgb(${r}, ${g}, ${b})`;

  document.getElementById("colorResult").innerHTML = `
    <div style="display:inline-flex;align-items:center;gap:10px;">
      <div style="width:30px;height:30px;border:1px solid #000;background:${rgb};border-radius:6px;"></div>
      <span><b>${colorName}</b> - ${rgb}</span>
    </div>
  `;

  detectedColors.push(`${colorName} - ${rgb}`);
});

// ✅ Color List (you can add more colors here)
const colors = [
  { name: "Black", r: 0, g: 0, b: 0 },
  { name: "White", r: 255, g: 255, b: 255 },
  { name: "Red", r: 255, g: 0, b: 0 },
  { name: "Green", r: 0, g: 255, b: 0 },
  { name: "Blue", r: 0, g: 0, b: 255 },
  { name: "Yellow", r: 255, g: 255, b: 0 },
  { name: "Aqua", r: 0, g: 255, b: 255 },
  { name: "Fuchsia", r: 255, g: 0, b: 255 },
  { name: "Gray", r: 128, g: 128, b: 128 },
  { name: "Maroon", r: 128, g: 0, b: 0 },
  { name: "Olive", r: 128, g: 128, b: 0 },
  { name: "Purple", r: 128, g: 0, b: 128 },
  { name: "Teal", r: 0, g: 128, b: 128 },
  { name: "Navy", r: 0, g: 0, b: 128 },
  { name: "Silver", r: 192, g: 192, b: 192 },
  { name: "Red", r: 255, g: 0, b: 0 },
  { name: "Lime", r: 0, g: 255, b: 0 },
  { name: "Blue", r: 0, g: 0, b: 255 },
  { name: "Yellow", r: 255, g: 255, b: 0 },
  { name: "Aqua", r: 0, g: 255, b: 255 },
  { name: "Fuchsia", r: 255, g: 0, b: 255 },
  { name: "Gray", r: 128, g: 128, b: 128 },
  { name: "Maroon", r: 128, g: 0, b: 0 },
  { name: "Olive", r: 128, g: 128, b: 0 },
  { name: "Purple", r: 128, g: 0, b: 128 },
  { name: "Teal", r: 0, g: 128, b: 128 },
  { name: "Navy", r: 0, g: 0, b: 128 },
  { name: "AliceBlue", r: 240, g: 248, b: 255 },
  { name: "AntiqueWhite", r: 250, g: 235, b: 215 },
  { name: "Aqua", r: 0, g: 255, b: 255 },
  { name: "Aquamarine", r: 127, g: 255, b: 212 },
  { name: "Azure", r: 240, g: 255, b: 255 },
  { name: "Beige", r: 245, g: 245, b: 220 },
  { name: "Bisque", r: 255, g: 228, b: 196 },
  { name: "Black", r: 0, g: 0, b: 0 },
  { name: "BlanchedAlmond", r: 255, g: 235, b: 205 },
  { name: "Blue", r: 0, g: 0, b: 255 },
  { name: "BlueViolet", r: 138, g: 43, b: 226 },
  { name: "Brown", r: 165, g: 42, b: 42 },
  { name: "BurlyWood", r: 222, g: 184, b: 135 },
  { name: "CadetBlue", r: 95, g: 158, b: 160 },
  { name: "Chartreuse", r: 127, g: 255, b: 0 },
  { name: "Chocolate", r: 210, g: 105, b: 30 },
  { name: "Coral", r: 255, g: 127, b: 80 },
  { name: "CornflowerBlue", r: 100, g: 149, b: 237 },
  { name: "Cornsilk", r: 255, g: 248, b: 220 },
  { name: "Crimson", r: 220, g: 20, b: 60 },
  { name: "Cyan", r: 0, g: 255, b: 255 },
  { name: "DarkBlue", r: 0, g: 0, b: 139 },
  { name: "DarkCyan", r: 0, g: 139, b: 139 },
  { name: "DarkGoldenrod", r: 184, g: 134, b: 11 },
  { name: "DarkGray", r: 169, g: 169, b: 169 },
  { name: "DarkGreen", r: 0, g: 100, b: 0 },
  { name: "DarkKhaki", r: 189, g: 183, b: 107 },
  { name: "DarkMagenta", r: 139, g: 0, b: 139 },
  { name: "DarkOliveGreen", r: 85, g: 107, b: 47 },
  { name: "DarkOrange", r: 255, g: 140, b: 0 },
  { name: "DarkOrchid", r: 153, g: 50, b: 204 },
  { name: "DarkRed", r: 139, g: 0, b: 0 },
  { name: "DarkSalmon", r: 233, g: 150, b: 122 },
  { name: "DarkSeaGreen", r: 143, g: 188, b: 139 },
  { name: "DarkSlateBlue", r: 72, g: 61, b: 139 },
  { name: "DarkSlateGray", r: 47, g: 79, b: 79 },
  { name: "DarkTurquoise", r: 0, g: 206, b: 209 },
  { name: "DarkViolet", r: 148, g: 0, b: 211 },
  { name: "DeepPink", r: 255, g: 20, b: 147 },
  { name: "DeepSkyBlue", r: 0, g: 191, b: 255 },
  { name: "DimGray", r: 105, g: 105, b: 105 },
  { name: "DodgerBlue", r: 30, g: 144, b: 255 },
  { name: "FireBrick", r: 178, g: 34, b: 34 },
  { name: "FloralWhite", r: 255, g: 250, b: 240 },
  { name: "ForestGreen", r: 34, g: 139, b: 34 },
  { name: "Fuchsia", r: 255, g: 0, b: 255 },
  { name: "Gainsboro", r: 220, g: 220, b: 220 },
  { name: "GhostWhite", r: 248, g: 248, b: 255 },
  { name: "Gold", r: 255, g: 215, b: 0 },
  { name: "Goldenrod", r: 218, g: 165, b: 32 },
  { name: "Gray", r: 128, g: 128, b: 128 },
  { name: "Green", r: 0, g: 128, b: 0 },
  { name: "GreenYellow", r: 173, g: 255, b: 47 },
  { name: "Honeydew", r: 240, g: 255, b: 240 },
  { name: "HotPink", r: 255, g: 105, b: 180 },
  { name: "IndianRed", r: 205, g: 92, b: 92 },
  { name: "Indigo", r: 75, g: 0, b: 130 },
  { name: "Ivory", r: 255, g: 255, b: 240 },
  { name: "Khaki", r: 240, g: 230, b: 140 },
  { name: "Lavender", r: 230, g: 230, b: 250 },
  { name: "LavenderBlush", r: 255, g: 240, b: 245 },
  { name: "LawnGreen", r: 124, g: 252, b: 0 },
  { name: "LemonChiffon", r: 255, g: 250, b: 205 },
  { name: "LightBlue", r: 173, g: 216, b: 230 },
  { name: "LightCoral", r: 240, g: 128, b: 128 },
  { name: "LightCyan", r: 224, g: 255, b: 255 },
  { name: "LightGoldenrodYellow", r: 250, g: 250, b: 210 },
  { name: "LightGreen", r: 144, g: 238, b: 144 },
  { name: "LightGrey", r: 211, g: 211, b: 211 },
  { name: "LightPink", r: 255, g: 182, b: 193 },
  { name: "LightSalmon", r: 255, g: 160, b: 122 },
{ name: "LightSeaGreen", r: 32, g: 178, b: 170 },
{ name: "LightSkyBlue", r: 135, g: 206, b: 250 },
{ name: "LightSlateGray", r: 119, g: 136, b: 153 },
{ name: "LightSteelBlue", r: 176, g: 196, b: 222 },
{ name: "LightYellow", r: 255, g: 255, b: 224 },
{ name: "Lime", r: 0, g: 255, b: 0 },
{ name: "LimeGreen", r: 50, g: 205, b: 50 },
{ name: "Linen", r: 250, g: 240, b: 230 },
{ name: "Magenta", r: 255, g: 0, b: 255 },
{ name: "Maroon", r: 128, g: 0, b: 0 },
{ name: "MediumAquamarine", r: 102, g: 205, b: 170 },
{ name: "MediumBlue", r: 0, g: 0, b: 205 },
{ name: "MediumOrchid", r: 186, g: 85, b: 211 },
{ name: "MediumPurple", r: 147, g: 112, b: 219 },
{ name: "MediumSeaGreen", r: 60, g: 179, b: 113 },
{ name: "MediumSlateBlue", r: 123, g: 104, b: 238 },
{ name: "MediumSpringGreen", r: 0, g: 250, b: 154 },
{ name: "MediumTurquoise", r: 72, g: 209, b: 204 },
{ name: "MediumVioletRed", r: 199, g: 21, b: 133 },
{ name: "MidnightBlue", r: 25, g: 25, b: 112 },
{ name: "MintCream", r: 245, g: 255, b: 250 },
{ name: "MistyRose", r: 255, g: 228, b: 225 },
{ name: "Moccasin", r: 255, g: 228, b: 181 },
{ name: "NavajoWhite", r: 255, g: 222, b: 173 },
{ name: "Navy", r: 0, g: 0, b: 128 },
{ name: "OldLace", r: 253, g: 245, b: 230 },
{ name: "Olive", r: 128, g: 128, b: 0 },
{ name: "OliveDrab", r: 107, g: 142, b: 35 },
{ name: "Orange", r: 255, g: 165, b: 0 },
{ name: "OrangeRed", r: 255, g: 69, b: 0 },
{ name: "Orchid", r: 218, g: 112, b: 214 },
{ name: "PaleGoldenrod", r: 238, g: 232, b: 170 },
{ name: "PaleGreen", r: 152, g: 251, b: 152 },
{ name: "PaleTurquoise", r: 175, g: 238, b: 238 },
{ name: "PaleVioletRed", r: 219, g: 112, b: 147 },
{ name: "PapayaWhip", r: 255, g: 239, b: 213 },
{ name: "PeachPuff", r: 255, g: 218, b: 185 },
{ name: "Peru", r: 205, g: 133, b: 63 },
{ name: "Pink", r: 255, g: 192, b: 203 },
{ name: "Plum", r: 221, g: 160, b: 221 },
{ name: "PowderBlue", r: 176, g: 224, b: 230 },
{ name: "Purple", r: 128, g: 0, b: 128 },
{ name: "RebeccaPurple", r: 102, g: 51, b: 153 },
{ name: "Red", r: 255, g: 0, b: 0 },
{ name: "RosyBrown", r: 188, g: 143, b: 143 },
{ name: "RoyalBlue", r: 65, g: 105, b: 225 },
{ name: "SaddleBrown", r: 139, g: 69, b: 19 },
{ name: "Salmon", r: 250, g: 128, b: 114 },
{ name: "SandyBrown", r: 244, g: 164, b: 96 },
{ name: "SeaGreen", r: 46, g: 139, b: 87 },
{ name: "SeaShell", r: 255, g: 245, b: 238 },
{ name: "Sienna", r: 160, g: 82, b: 45 },
{ name: "Silver", r: 192, g: 192, b: 192 },
{ name: "SkyBlue", r: 135, g: 206, b: 235 },
{ name: "SlateBlue", r: 106, g: 90, b: 205 },
{ name: "SlateGray", r: 112, g: 128, b: 144 },
{ name: "Snow", r: 255, g: 250, b: 250 },
{ name: "SpringGreen", r: 0, g: 255, b: 127 },
{ name: "SteelBlue", r: 70, g: 130, b: 180 },
{ name: "Tan", r: 210, g: 180, b: 140 },
{ name: "Teal", r: 0, g: 128, b: 128 },
{ name: "Thistle", r: 216, g: 191, b: 216 },
{ name: "Tomato", r: 255, g: 99, b: 71 },
{ name: "Turquoise", r: 64, g: 224, b: 208 },
{ name: "Violet", r: 238, g: 130, b: 238 },
{ name: "Wheat", r: 245, g: 222, b: 179 },
{ name: "White", r: 255, g: 255, b: 255 },
{ name: "WhiteSmoke", r: 245, g: 245, b: 245 },
{ name: "Yellow", r: 255, g: 255, b: 0 },
{ name: "YellowGreen", r: 154, g: 205, b: 50 },
{ name: "DarkRed", r: 139, g: 0, b: 0 },
{ name: "Red", r: 255, g: 0, b: 0 },
{ name: "FireBrick", r: 178, g: 34, b: 34 },
{ name: "Crimson", r: 220, g: 20, b: 60 },
{ name: "IndianRed", r: 205, g: 92, b: 92 },
{ name: "LightCoral", r: 240, g: 128, b: 128 },
{ name: "Salmon", r: 250, g: 128, b: 114 },
{ name: "DarkSalmon", r: 233, g: 150, b: 122 },
{ name: "Tomato", r: 255, g: 99, b: 71 },
{ name: "OrangeRed", r: 255, g: 69, b: 0 },
{ name: "Coral", r: 255, g: 127, b: 80 },
{ name: "DarkGreen", r: 0, g: 100, b: 0 },
  { name: "Green", r: 0, g: 128, b: 0 },
  { name: "ForestGreen", r: 34, g: 139, b: 34 },
  { name: "SeaGreen", r: 46, g: 139, b: 87 },
  { name: "Olive", r: 128, g: 128, b: 0 },
  { name: "OliveDrab", r: 107, g: 142, b: 35 },
  { name: "Lime", r: 0, g: 255, b: 0 },
  { name: "LimeGreen", r: 50, g: 205, b: 50 },
  { name: "LightGreen", r: 144, g: 238, b: 144 },
  { name: "PaleGreen", r: 152, g: 251, b: 152 },
  { name: "SpringGreen", r: 0, g: 255, b: 127 },
  { name: "MediumSeaGreen", r: 60, g: 179, b: 113 },
 { name: "Navy", r: 0, g: 0, b: 128 },
  { name: "DarkBlue", r: 0, g: 0, b: 139 },
  { name: "MediumBlue", r: 0, g: 0, b: 205 },
  { name: "Blue", r: 0, g: 0, b: 255 },
  { name: "RoyalBlue", r: 65, g: 105, b: 225 },
  { name: "DodgerBlue", r: 30, g: 144, b: 255 },
  { name: "DeepSkyBlue", r: 0, g: 191, b: 255 },
  { name: "CornflowerBlue", r: 100, g: 149, b: 237 },
  { name: "SteelBlue", r: 70, g: 130, b: 180 },
  { name: "LightSkyBlue", r: 135, g: 206, b: 250 },
  { name: "SkyBlue", r: 135, g: 206, b: 235 },
  { name: "LightBlue", r: 173, g: 216, b: 230 },
  { name: "PowderBlue", r: 176, g: 224, b: 230 },
  { name: "Turquoise", r: 64, g: 224, b: 208 },
  { name: "CadetBlue", r: 95, g: 158, b: 160 },
  { name: "Black", r: 0, g: 0, b: 0 },
  { name: "DimGray", r: 105, g: 105, b: 105 },
  { name: "Gray", r: 128, g: 128, b: 128 },
  { name: "DarkGray", r: 169, g: 169, b: 169 },
  { name: "Silver", r: 192, g: 192, b: 192 },
  { name: "LightGray", r: 211, g: 211, b: 211 },
  { name: "Gainsboro", r: 220, g: 220, b: 220 }
];

 


function getNearestColorName(r, g, b) {
  // Treat very dark colors as Black
  if (r < 20 && g < 20 && b < 20) return "Black";
  // Treat very bright colors as White
  if (r > 240 && g > 240 && b > 240) return "White";

  let nearestColor = colors[0];
  let nearestDistance = Number.MAX_VALUE;

  colors.forEach(color => {
    let distance = Math.sqrt(
      Math.pow(r - color.r, 2) +
      Math.pow(g - color.g, 2) +
      Math.pow(b - color.b, 2)
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestColor = color;
    }
  });

  return nearestColor.name;
}

// ✅ Download Colors
function downloadColor() {
  if (detectedColors.length === 0) {
    alert("No colors detected yet!");
    return;
  }

  let htmlContent = `
  <html>
  <head>
    <title>Detected Colors</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      .color-item { display: flex; align-items: center; margin: 5px 0; }
      .color-box { width: 30px; height: 30px; margin-right: 10px; border: 1px solid #000; border-radius: 5px; }
    </style>
  </head>
  <body>
    <h2>Detected Colors</h2>
  `;

  detectedColors.forEach(item => {
    const parts = item.split(" - ");
    const name = parts[0];
    const rgb = parts[1];

    htmlContent += `
      <div class="color-item">
        <div class="color-box" style="background-color: ${rgb};"></div>
        <span>${name} (${rgb})</span>
      </div>
    `;
  });

  htmlContent += `</body></html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "detected_colors.html";
  link.click();
}