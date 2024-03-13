// console.log("Script Frame")
const svgFilePath = "files/frames/watercolor/1.svg";

fetch('http://192.168.1.60:5000/api/user/adminCategories')
    .then(response => response.json())
    .then(data => {
        // console.log("Category Data ::: ", data?.result)
        data?.result?.map(value => {
            // console.log("Category Name ::: ", value?.categoryName)

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
                                // console.log("Sub Category Name ::: ", category?.subCategoryName)
                                var subContainer = document.querySelector(`#${value?.categoryName} .insert-sub-category`);
                                // console.log("Sub Container ::: ", subContainer)

                                //! Create a new list item element for Sub Category
                                var innerListItem = document.createElement("li");
                                innerListItem.setAttribute("data-keyword", "search-keyword");
                                // innerListItem.classList.add("palleon-icon-menu-btn");
                                // innerListItem.setAttribute("data-target", "#child-category");
                                listItem.setAttribute("data-target", '#' + category?.subCategoryName);

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
                                    // document.getElementById('child-category').classList.remove("panel-hide")
                                    document.getElementById(category?.subCategoryName).classList.remove("panel-hide")

                                    if (category?._id) {
                                        const childData = { _id: category?._id };
                                        const childOptions = {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(childData)
                                        };

                                        var childContainer = document.querySelector(`#${category?.subCategoryName} .insert-child-category`);

                                        fetch('http://192.168.1.60:5000/api/user/adminChildCategories', childOptions)
                                            .then(response => response.json())
                                            .then(resData => {
                                                console.log("Child Response Data ::: ", resData)

                                                resData?.result?.map(childValue => {
                                                    console.log("Child Value ::: ", childValue)

                                                    // !Dynamic Start

                                                    // Creating the <li> element
                                                    let liElement = document.createElement('li');
                                                    liElement.setAttribute('data-keyword', childValue?.childCategoryName);
                                                    // liElement.classList.add( 'opened');


                                                    // Creating the <a> element
                                                    let aElement = document.createElement('a');
                                                    aElement.setAttribute('href', '#');
                                                    aElement.textContent = childValue?.childCategoryName;

                                                    // Creating the <span> element
                                                    let spanElement = document.createElement('span');
                                                    spanElement.classList.add('material-icons', 'arrow');
                                                    spanElement.textContent = 'keyboard_arrow_down';

                                                    // Appending <span> to <a>
                                                    aElement.appendChild(spanElement);

                                                    // Appending <a> to <li>
                                                    liElement.appendChild(aElement);

                                                    // Creating the outer <div> element
                                                    let outerDivElement = document.createElement('div');

                                                    // Creating the inner <div> element
                                                    let innerDivElement = document.createElement('div');
                                                    innerDivElement.setAttribute('id', 'palleon-frames-grid-watercolor');
                                                    innerDivElement.classList.add('palleon-frames-grid', 'paginated');
                                                    innerDivElement.setAttribute('data-perpage', '4');

                                                    // Creating the frame <div> element
                                                    let frameDivElement = document.createElement('div');
                                                    frameDivElement.classList.add('palleon-frame');
                                                    frameDivElement.setAttribute('data-elsource', "http://192.168.1.60:5000/" + childValue?.childCategoryImageSVG);

                                                    // Create the image wrapper <div> element
                                                    let imageWrapperDivElement = document.createElement('div');
                                                    imageWrapperDivElement.classList.add('palleon-img-wrap');

                                                    // Creating the image element
                                                    let imgElement = document.createElement('img');
                                                    imgElement.setAttribute('data-src', "http://192.168.1.60:5000/" + childValue?.childCategoryImage);
                                                    // imgElement.setAttribute('height', '50px');
                                                    imgElement.classList.add('lazy')

                                                    let innerDivLoader = document.createElement('div');
                                                    innerDivLoader.classList.add('palleon-img-loader');

                                                    // Appending image and loader to frame div
                                                    imageWrapperDivElement.appendChild(innerDivLoader);
                                                    imageWrapperDivElement.appendChild(imgElement);

                                                    // Appending imageWrapper to frame div
                                                    frameDivElement.appendChild(imageWrapperDivElement);

                                                    // Appending frame div to inner div
                                                    innerDivElement.appendChild(frameDivElement);

                                                    // Appending inner div to outer div
                                                    outerDivElement.appendChild(innerDivElement);

                                                    // Appending outer div to li
                                                    liElement.appendChild(outerDivElement);

                                                    // Appending li to childContainer
                                                    childContainer.appendChild(liElement);

                                                    liElement.onclick = function () {
                                                        console.log("Clicked Image Parent List ::: ", liElement)
                                                        liElement.classList.add('opened');
                                                        imageWrapperDivElement.style.minHeight = 'auto';
                                                        imgElement.classList.add('entered', 'loaded')
                                                        imgElement.setAttribute('data-ll-status', 'loaded')
                                                        innerDivLoader.remove();
                                                        imgElement.setAttribute('src', "http://192.168.1.60:5000/" + childValue?.childCategoryImage);

                                                        imgElement.onclick = function () {
                                                            console.log("Clicked Image List")
                                                            frameDivElement.classList.add('active');
                                                        }
                                                    }

                                                })
                                            })
                                            .catch(error => console.error('Error fetching data:', error));
                                    }
                                }

                                innerListItem.appendChild(innerAnchor);
                                subContainer.appendChild(innerListItem);

                                //! Adding Child Category - Start
                                var containerChild = document.getElementById(value?.categoryName);
                                var htmlCodeChild = `
                                    <div id=${category?.subCategoryName} class="palleon-icon-panel-content panel-hide">
                                        <div class="palleon-tabs">
                                            <div id="palleon-all-frames" class="palleon-tab active">
                                                <ul id="palleon-frames-wrap" class="palleon-accordion insert-child-category">
                                                   
                                                </ul>
                                            </div>
                                        </div>
                                        <div id="palleon-noframes" class="notice notice-warning">Nothing found.</div>
                                    </div>
                                `
                                containerChild.insertAdjacentHTML('afterend', htmlCodeChild);
                                //! Adding Child Category - End
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