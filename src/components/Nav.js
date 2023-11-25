import React from "react";
const Nav=({setLibraryStatus,LibraryStatus})=>{
 return(
    <nav>
        <h1>Waves</h1>
        <button onClick={()=>setLibraryStatus(!LibraryStatus)}>Library

        </button>
    </nav>
 )
}
export default Nav;