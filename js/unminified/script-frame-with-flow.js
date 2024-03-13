console.log("Script Frame")
// const svgFilePath = "files/frames/watercolor/1.svg";
var imagePath = "files/frames/watercolor/2.jpg";

fetch('http://192.168.1.60:5000/api/user/adminCategories')
    .then(response => response.json())
    .then(data => {
        console.log("Category Data ::: ", data?.result)
        data?.result?.map(value => {
            console.log("Category Name ::: ", value?.categoryName)

            //! Create a new list item element for Category
            var listItem = document.createElement("li");
            listItem.setAttribute("data-keyword", "search-keyword");
            // listItem.classList.add("palleon-icon-menu-btn");
            listItem.setAttribute("data-target", '#' + value?.categoryName);

            //! Create the anchor element
            var anchor = document.createElement("a");
            anchor.setAttribute("href", "#");
            // anchor.textContent = value?.categoryName;
            anchor.textContent = value?.categoryName;

            //! Add onclick event handler to the anchor element
            listItem.onclick = function () {
                console.log("Category Name Clicked:", value?.categoryName);
                // console.log("Category Name Clicked ID:", value?._id);
                listItem.classList.add('opened')
                listItem.classList.add('active')
                document.getElementById('palleon-frames-category').classList.add('panel-hide')
                document.getElementById(value?.categoryName).classList.remove('panel-hide')

                if (value?._id) {
                    const data = { _id: value?._id };
                    const options = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    };

                    fetch('http://192.168.1.60:5000/api/user/adminSubcategories', options)
                        .then(response => response.json())
                        .then(data => {
                            console.log("Sub Category Data ::: ", data?.result)
                            data?.result?.map(category => {
                                console.log("Sub Category Name ::: ", category?.subCategoryName)
                                var subContainer = document.querySelector(`#${value?.categoryName} .insert-sub-category`);
                                // console.log("Sub Container ::: ", subContainer)

                                //! Create a new list item element for Sub Category
                                var innerListItem = document.createElement("li");
                                innerListItem.setAttribute("data-keyword", "search-keyword");
                                // innerListItem.classList.add("palleon-icon-menu-btn");
                                innerListItem.setAttribute("data-target", "#child-category");

                                // Create the anchor element
                                var innerAnchor = document.createElement("a");
                                innerAnchor.setAttribute("href", "#");
                                innerAnchor.textContent = category?.subCategoryName;

                                //! Add onclick event handler to the Anchor Element
                                innerListItem.onclick = function () {
                                    console.log("Sub Category Name Clicked ::: ", category?.subCategoryName)
                                    console.log("Sub Category Name Clicked ID ::: ", category?._id)
                                    innerListItem.classList.add('opened')
                                    innerListItem.classList.add('active')
                                    document.getElementById(value?.categoryName).classList.add('panel-hide')
                                    document.getElementById('child-category').classList.remove("panel-hide")
                                }

                                innerListItem.appendChild(innerAnchor);
                                subContainer.appendChild(innerListItem);

                                // var containerChild = document.getElementById(value?.categoryName);
                                // var htmlCodeChild = `
                                // <div id="child-category" class="palleon-icon-panel-content panel-hide">
                                //     <div class="palleon-tabs">
                                //         <div id="palleon-all-frames" class="palleon-tab active">
                                //             <ul id="palleon-frames-wrap" class="palleon-accordion insert-child-category">
                                //                 <li data-keyword="watercolor" class='opened'>
                                //                     <a href="#">Hard Code Dynamic Child Category <span class="material-icons arrow">keyboard_arrow_down</span></a>
                                //                     <div>
                                //                         <div id="palleon-frames-grid-watercolor" class="palleon-frames-grid paginated"
                                //                             data-perpage="4">
                                //                             <div class="palleon-frame" data-elsource="files/frames/watercolor/1.svg">
                                //                                 <div class="palleon-img-wrap">
                                //                                     <div class="palleon-img-loader"></div><img class="lazy"
                                //                                         data-src="${imagePath}" />
                                //                                 </div>
                                //                                 <div class="frame-favorite">
                                //                                     <button type="button" class="palleon-btn-simple star "
                                //                                         data-frameid="files/frames/watercolor/1"><span
                                //                                             class="material-icons">star_border</span></button>
                                //                                 </div>
                                //                             </div>
                                //                         </div>
                                //                     </div>
                                //                 </li>
                                //             </ul>
                                //         </div>
                                //     </div>
                                //     <div id="palleon-noframes" class="notice notice-warning">Nothing found.</div>
                                // </div>
                                // `
                                // containerChild.insertAdjacentHTML('afterend', htmlCodeChild);
                            })
                        })
                        .catch(error => console.error('Error fetching data:', error));
                }
            };

            //! Append the anchor element to the list item
            listItem.appendChild(anchor);

            //! Append the new list item to the target element
            document.querySelector("#palleon-frames-category .insert-category").appendChild(listItem);

            //! Adding Sub Category 
            var container = document.getElementById('palleon-frames-category');
            var htmlCode = `
                            <div id=${value?.categoryName} class="palleon-icon-panel-content">
                                <div id="palleon-all-frames" class="palleon-tab active">
                                    <ul id="palleon-frames-wrap" class="palleon-accordion insert-sub-category">

                                    </ul>
                                </div>
                            </div>
                            `

            container.insertAdjacentHTML('afterend', htmlCode);
        })
    })
    .catch(error => console.error('Error fetching data:', error));

// //! Total Flow Without API
// fetch('http://192.168.1.60:5000/api/user/adminCategories')
//     .then(response => response.json())
//     .then(data => {
//         console.log("Category Data ::: ", data?.result)
//         data?.result?.map(value => {
//             console.log("Category Name ::: ", value?.categoryName)

//             // Create a new list item element
//             var listItem = document.createElement("li");
//             listItem.setAttribute("data-keyword", "search-keyword");
//             listItem.classList.add("palleon-icon-menu-btn");
//             listItem.setAttribute("data-target", '#' + value?.categoryName);

//             // Create the anchor element
//             var anchor = document.createElement("a");
//             anchor.setAttribute("href", "#");
//             anchor.textContent = value?.categoryName;

//             // Add onclick event handler to the anchor element
//             listItem.onclick = function () {
//                 console.log("Category Name Clicked:", value?.categoryName);
//                 console.log("Category Name Clicked ID:", value?._id);
//             };

//             // Append the anchor element to the list item
//             listItem.appendChild(anchor);

//             // Append the new list item to the target element
//             document.querySelector("#palleon-frames-category .insert-category").appendChild(listItem);
//         })
//     })
//     .catch(error => console.error('Error fetching data:', error));