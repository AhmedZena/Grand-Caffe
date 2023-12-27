const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

// get the users from local storage
let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

// get the table body
let tableBody = document.querySelector(".table tbody");

// loop on the users array

for (let i = 0; i < users.length; i++) {
  // create tr
  let tr = document.createElement("tr");

  // create td
  let idTd = document.createElement("td");
  let nameTd = document.createElement("td");
  let emailTd = document.createElement("td");
  let roleTd = document.createElement("td");
  let joinTimeTd = document.createElement("td");
  let ageTd = document.createElement("td");
  let countryTd = document.createElement("td");
  let balanceTd = document.createElement("td");
  let actionsTd = document.createElement("td");

  // append the td to the tr
  tr.appendChild(idTd);
  tr.appendChild(nameTd);
  tr.appendChild(emailTd);
  tr.appendChild(roleTd);
  tr.appendChild(joinTimeTd);
  tr.appendChild(ageTd);
  tr.appendChild(countryTd);
  tr.appendChild(balanceTd);
  tr.appendChild(actionsTd);
  if (users[i].role == "admin") {
    tr.classList.add("active");
  }
  // append the tr to the table body
  tableBody.appendChild(tr);

  // fill the td with data
  idTd.textContent = users[i].id;
  nameTd.textContent = users[i].name;
  emailTd.textContent = users[i].email;
  roleTd.textContent = users[i].role || "user";
  // <!-- joinTimeTd.textContent = users[ i ].joinDate; // 12/21/2023, 6:47:10 AM -->
  //joinTimeTd.textContent = new Date( users[ i ].joinDate ).toLocaleString() || "12/21/2023, 6:47:10 AM";
  //joinTimeTd.textContent = users[ i ].joinDate;
  users[i].joinDate
    ? (joinTimeTd.textContent = new Date(users[i].joinDate).toLocaleString())
    : (joinTimeTd.textContent = "12/21/2023, 6:47:10 AM");
  ageTd.textContent = users[i].age || "not set";
  countryTd.textContent = users[i].country || "not set";
  balanceTd.textContent = users[i].balance || "0";

  // create button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");

  // append the button to the td
  actionsTd.appendChild(deleteBtn);
  actionsTd.appendChild(editBtn);

  // add event listener to the button
  deleteBtn.addEventListener("click", function () {
    // show the popup
    document.querySelector(".popup").style.display = "flex";

    // add event listener to the yes button
    document.querySelector(".yes").addEventListener("click", function () {
      // delete the user from the array
      users.splice(i, 1);

      // update the local storage
      localStorage.setItem("users", JSON.stringify(users));

      // remove the tr from the table
      tr.remove();

      // hide the popup
      document.querySelector(".popup").style.display = "none";
    });

    // add event listener to the no button
    document.querySelector(".no").addEventListener("click", function () {
      // hide the popup
      document.querySelector(".popup").style.display = "none";
    });
  });

  editBtn.addEventListener("click", function () {
    // show the popup
    document.querySelector(".popup-edit").style.display = "flex";

    // fill the popup with data
    document.querySelector("#userName").textContent = users[i].name;
    document.querySelector("#userEmail").textContent = users[i].email;
    document.querySelector("#role").value = users[i].role;
    document.querySelector("#age").value = users[i].age;
    document.querySelector("#country").value = users[i].country;
    document.querySelector("#balance").value = +users[i].balance;

    document.querySelector(".save").addEventListener("click", function () {
      // get the role value
      let role = document.querySelector("#role").value;

      // get the age value
      let age = document.querySelector("#age").value;

      // get the country value
      let country = document.querySelector("#country").value;

      // get the balance value
      let balance = document.querySelector("#balance").value;

      // update the user object
      users[i].role = role;
      users[i].age = age;
      users[i].country = country;
      users[i].balance = balance;

      // update the local storage
      localStorage.setItem("users", JSON.stringify(users));

      // hide the popup
      document.querySelector(".popup-edit").style.display = "none";

      // update the table
      roleTd.textContent = role;
      ageTd.textContent = age;
      countryTd.textContent = country;
      balanceTd.textContent = balance;
    });

    // add event listener to the cancel button
    document.querySelector(".cancel").addEventListener("click", function (e) {
      e.preventDefault();

      // hide the popup
      document.querySelector(".popup-edit").style.display = "none";
    });
  });
}

// for premium users
/*
           
            [
   {
       "id": 76711303,
       "name": "mohamed abdElhameed",
       "email": "moh@gmail.com",
       "password": "123456aA",
       "joinDate": "2023-12-21T04:46:14.668Z",
       "role": "user",
       "age": "",
       "country": "",
       "balance": "0"
   },
   {
       "id": 505304762,
       "name": "medhat",
       "email": "medhat@gmail.com",
       "password": "123456aA",
       "joinDate": "12/21/2023, 6:47:10 AM",
       "role": "admin",
       "age": "",
       "country": "",
       "balance": "0"
   },
   {
       "id": 590018760,
       "name": "ahmed",
       "email": "ahmedgamal@gmail.com",
       "password": "123456aA",
       "joinDate": "12/21/2023, 6:56:28 AM",
       "age": "23",
       "role": "user",
       "country": "",
       "balance": "0"
   },
   {
       "id": 772336679,
       "name": "ahmed zena",
       "email": "ahmedzena@gmail.com",
       "password": "123456aA",
       "joinDate": "12/21/2023, 8:11:28 AM",
       "role": "user",
       "balance": 70,
       "prouctsBuyed": [
           {
               "id": "c1t1v2s1",
               "size": "125",
               "price": 55,
               "cups": "6 cups",
               "pics": [
                   "https://seelaz.com/cdn/shop/products/Espresso125gmvol2.png?v=1668458736&width=713",
                   "https://seelaz.com/cdn/shop/products/Espresso.png?v=1668458744&width=713",
                   "https://seelaz.com/cdn/shop/products/FrenchCoffee.png?v=1668458747&width=713"
               ],
               "name": "Espresso Coffee medium small",
               "chosnNumber": 1
           },
           {
               "id": "c1t1v3s3",
               "size": "500",
               "price": 170,
               "cups": "24 cups",
               "pics": [
                   "https://seelaz.com/cdn/shop/products/Espresso125gmvol2.png?v=1668458736&width=713",
                   "https://seelaz.com/cdn/shop/products/Espresso.png?v=1668458744&width=713",
                   "https://seelaz.com/cdn/shop/products/FrenchCoffee.png?v=1668458747&width=713"
               ],
               "name": "Espresso Coffee dark large",
               "chosnNumber": 1
           },
           {
               "id": "c1t1v4s2",
               "size": "250",
               "price": 105,
               "cups": "12 cups",
               "pics": [
                   "https://seelaz.com/cdn/shop/products/Espresso125gmvol2.png?v=1668458736&width=713",
                   "https://seelaz.com/cdn/shop/products/Espresso.png?v=1668458744&width=713",
                   "https://seelaz.com/cdn/shop/products/FrenchCoffee.png?v=1668458747&width=713"
               ],
               "name": "Espresso Coffee extraDark medium",
               "chosnNumber": 1
           }
       ]
   }
]
            */

// got only users who have products

let premiumUsers = users.filter((user) => user.prouctsBuyed);
console.log(premiumUsers);

// get the user section
let usersSection = document.querySelector(".users");

// loop on the premium users  and every time make card for every premium user and have naem and mail and per for products

for (let i = 0; i < premiumUsers.length; i++) {
  // create card
  let card = document.createElement("div");
  card.classList.add("card");

  // create img
  let img = document.createElement("img");
  // img.src = "../../assets/pics/admin/avatar.png";

  img.src = premiumUsers[i].avatarImage || "../../assets/pics/admin/avatar.png";

  img.alt = "avatar";
  img.width = "100";
  img.height = "100";

  // create h4
  let h4 = document.createElement("h4");
  h4.textContent = premiumUsers[i].name;

  // create p
  let p = document.createElement("p");
  p.textContent = "pro user";

  let pEmail = document.createElement("p");
  pEmail.textContent = premiumUsers[i].email;

  // create div
  let per = document.createElement("div");
  per.classList.add("per");

  // create table
  let table = document.createElement("table");

  // create tr
  let tr = document.createElement("tr");

  // create td
  let td = document.createElement("td");

  // create span
  let span = document.createElement("span");
  //    span.textContent = premiumUsers[ i ].prouctsBuyed.length;
  span.textContent = `${premiumUsers[i].prouctsBuyed.length} products`;
  // append the span to the td
  td.appendChild(span);

  // append the td to the tr
  tr.appendChild(td);

  // append the tr to the table
  table.appendChild(tr);

  // append the table to the div
  per.appendChild(table);

  // create button
  let button = document.createElement("button");
  button.textContent = "Profile";

  // append the img to the card
  card.appendChild(img);

  // append the h4 to the card
  card.appendChild(h4);

  // append the pEmail to the card
  card.appendChild(pEmail);

  // append the p to the card
  card.appendChild(p);

  // append the per to the card
  card.appendChild(per);

  // append the button to the card
  card.appendChild(button);

  // append the card to the users section
  usersSection.appendChild(card);
}
