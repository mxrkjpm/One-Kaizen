


const popuplinks = document.querySelectorAll(".popuplink")

    const closepopups = document.querySelectorAll(".close")
    popuplinks.forEach((item) =>{
        item.addEventListener("click", (e) => {
            // Get the element that was clicked
            const element = e.currentTarget;

            // Get the value of the 'data-target' attribute
            const dataTarget = element.getAttribute('data-target');
            const popupcontent=document.querySelector(dataTarget)
            popupcontent.classList.add("show")
        })
    })

    closepopups.forEach((item) =>{
        item.addEventListener("click", (e) => {
        // Get the element that was clicked
        const element = e.currentTarget;

        // Get the value of the 'data-target' attribute
        const dataTarget = element.getAttribute('data-target');
        // console.log (dataTarget)
            const popupcontent=document.querySelector(dataTarget)
            popupcontent.classList.remove("show")
        })

    })
    
    async function generateExcel() {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Define the worksheet data
        const title = "stringsample";
        const content = "samplecontent";
        const data = [
            [title],
            [content]
        ];

        // Create a new worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Generate the Excel file as a binary string
        const excelFile = XLSX.write(workbook, { type: "binary", bookType: "xlsx" });

        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(excelFile)], { type: "application/octet-stream" });

        // Get the current date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).replace(/\s/g, "-");

        // Set the filename as "Sales" followed by the current date
        const filename = `Sales_${formattedDate}.xlsx`;

        // Save the Blob as a file with the generated filename
        saveAs(blob, filename);
    } 

    // Utility function to convert string to array buffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }  



    const members = [
        {
            name: "John Doe",
            contact: "0912345678",
            membership_duration: "January 20, 2024"
        },
        {
            name: "Peter Lim",
            contact: "09581727326",
            membership_duration: "December 20, 2024"
        },
        {
            name: "Mark Zuckerberg",
            contact: "09581727326",
            membership_duration: "December 20, 2024"
        },
        {
            name: "Elon Musk",
            contact: "09581727326",
            membership_duration: "December 20, 2024"
        }
    ];

    // Function to check if a date has expired
    function isExpired(dateString) {
        // Parse the date string
        var date = new Date(dateString);
        
        // Get the current date
        var currentDate = new Date();

        // Compare the dates
        if (date < currentDate) {
            return true; // Date has expired
        } else {
            return false; // Date is still valid
        }
    } 

    function calculateRemainingTime(membershipDuration) {
        // Parse the membership duration string
        var expiryDate = new Date(membershipDuration);
    
        // Get the current date and time
        var currentDate = new Date();
    
        // Calculate the difference in milliseconds
        var difference = expiryDate.getTime() - currentDate.getTime();
    
        // Calculate remaining days, hours, minutes, and seconds
        var remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        var remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
    
        // Return an object with the remaining time components
        return {
            days: remainingDays,
            hours: remainingHours,
            minutes: remainingMinutes,
            seconds: remainingSeconds
        };
    } 


    const renderMembers = (members) => {
        const memberListElement = document.querySelector(".memberList");

        if(memberListElement) {
            memberListElement.innerHTML = "";

            members.forEach((item) => {

                const expired = isExpired(item.membership_duration);

                var remainingTime = calculateRemainingTime(item.membership_duration);

                console.log('isExpired', expired, item.name)
                const memberHtml = `
                    <div class="flex border-b border-[#ccc] pb-[15px] text-left mb-[10px]">
                        <div class="w-full max-w-[25%]">${item.name}</div>
                        <div class="w-full max-w-[25%]">${item.contact}</div>
                        <div class="w-full max-w-[25%]">
                            ${expired ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            ` :  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>`}
                        </div>
                <div class="w-full max-w-[25%]">${expired ? "EXPIRED" : `${remainingTime.days} days ${remainingTime.minutes} minutes remaining`}</div>
                </div>`;
                memberListElement.innerHTML += memberHtml;
            });
        }
        
    }; 

    renderMembers(members);

    const searchInput = document.getElementById("searchInput");

    if(searchInput) {
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filteredMembers = members.filter((member) => {
                return (
                    member.name.toLowerCase().includes(searchTerm) ||
                    member.contact.includes(searchTerm) ||
                    member.membership_duration.toLowerCase().includes(searchTerm)
                );
            });
            renderMembers(filteredMembers);
        });
    }
   


const header = document.querySelector('header');

function getWindowScrollOffset() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // return {
    //     top: scrollTop,
    //     left: scrollLeft
    // };

    console.log('scrollTop', scrollTop)

    if(scrollTop > 0) {
        header.classList.add('scrolled');
    }else {
        header.classList.remove('scrolled');
    }
}

// Initial log of scroll position
var scrollOffset = getWindowScrollOffset();

// window.onscroll = function() {
//     var scrollOffset = getWindowScrollOffset();
// };

window.onload = () => {
    getWindowScrollOffset(); 
}
window.onscroll = () => {
    getWindowScrollOffset(); 
}
