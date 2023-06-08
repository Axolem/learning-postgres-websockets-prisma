const my_favourate_songs = ["Jonh Wick", "Imagine", "Hote California"];
const order_of_song = [1, 2, 3];
const album_images =
    [
        "https://wp.inews.co.uk/wp-content/uploads/2023/03/SEI_149068840.jpg?resize=640,360&strip=all&quality=90",
        "https://th.bing.com/th/id/R.6f2a17c3be2b0c2bbffd33cc63fe9278?rik=gyRSq0BJo1KYzg&pid=ImgRaw&r=0",
        "https://f4.bcbits.com/img/a3931312869_10.jpg",
        "https://th.bing.com/th/id/OIP.iMqS2icv3RazDj4gOs3nyAHaEK?pid=ImgDet&rs=1"
    ]

//my_favourate_songs[0] = "Wonderwall"; //Mofidying a value

my_favourate_songs.push("Smells Like Teen Spirit"); //Add to the end

//my_favourate_songs.pop() // Remove last item

//my_favourate_songs.splice(0, 2)

const my_list_ul = document.getElementById("my_list");
const image_holder = document.getElementById("image_holder");

for (let index = 0; index < my_favourate_songs.length; index++) {

    const li = document.createElement("li");
    const text = document.createTextNode(my_favourate_songs[index]);

    li.appendChild(text);

    //Add event listener
    li.addEventListener("mouseover", function () {
        this.classList.add(["hover_styles"]);
        this.style.backgroundColor = "red";
    });

    li.addEventListener("mouseout", function () {
        this.classList.remove(["hover_styles"]);
        this.style.backgroundColor = "white";
    });

    li.addEventListener("click", function () {

       image_holder.innerHTML = "";

        const my_image = document.createElement("img");

        my_image.style.height = "100px";
        my_image.style.width = "100px";

        my_image.src =album_images[index]; 

        image_holder.append(my_image);

    });

    my_list_ul.append(li)
}

// Add event listener to each li
// Add a class to apply when the event is trigered
// Add the background of red
