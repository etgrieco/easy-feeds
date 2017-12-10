export default function LoadingAnimation(props) {

  return(
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1")>
        <defs>
          <filter id="gooey" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="10", result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo") />
          <feBlend in="SourceGraphic" in2="goo") />
        </defs>
      </svg>
    </div>
  );
}



// - for (var i = 0; i < 6; i++)
// div(class="blob blob-" + i)
