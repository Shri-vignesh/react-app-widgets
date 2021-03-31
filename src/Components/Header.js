import Link from './Link';

const Header = () => {
  return(
    // Clicing on any of these links updates the URL and PAGE REFRESHES which causes the App.js
    // render method to re-rerender resulting in particular component to show up
    <div className = "ui secondary pointing menu">
      <Link href="/" className="item" >Accordian</Link>
      <Link href="/List" className="item" >List</Link>
      <Link href="/Dropdown" className="item" >Dropdown</Link>
      <Link href="/Translate" className="item" >Translate</Link>
    </div>
  );
};

export default Header;

//-------------------------------------------------------------------------------------------
//How a noraml traditional web applicaiton works or handles navigation?
//A normal we applcation consisting of variety of HTML doc and when we navigate to some page
// inside our browser our HTML Browser makes request to some server and gets back some HTML 
//document, this HTML is then parsed and displayed on the screen any appropriate script 
//tags are loaded up along with CSS as well, now when the browser clicks on some link again
//the browser sends some request to some server and get back another HTML doc which again
//makes some appropriate script tags and CSS to get loaded up.

//So basiocally on clicking on a link we get an HTML document meaning we reload entire
//index.html file inside our project

//this is what happening with our code below:

                    {/* <div className = "ui secondary pointing menu">
                          <a href="/" className="item" >Accordian</a>
                          <a href="/List" className="item" >List</a>
                          <a href="/Dropdown" className="item" >Dropdown</a>
                          <a href="/Translate" className="item" >Translate</a>
                        </div> */}

//But since its a react application index.html file gets loaded up along with js and css file 
//so there is no reason for us to hard reload of the page.

//SOLUTION : on clicking a link update the URL but do not do page refresh