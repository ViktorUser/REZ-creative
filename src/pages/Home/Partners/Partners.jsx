import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useContext, useEffect, useRef } from "react";
import './Partners.scss';
import { useGSAP } from "@gsap/react";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

// const logos = ["ubisoft", "behaviour", "capcom", "kodansha"];

export default function Partners() {
  const { data, isLoading } = useContext(DataContext);

  return !isLoading && (
    <section className="partners">
      <div className="partners__slider">
        <div className="partners__slider-wrapper">
          {data.partners.logos.map((currLogo, i) => (
            <img
              alt=""
              key={`partners-logo--${i}`}
              className="partners__logo"
              src={currLogo}
            />
          ))}
        </div>
        <div className="partners__slider-wrapper">
          {data.partners.logos.map((currLogo, i) => (
            <img
              alt=""
              key={`partners-logo--${i}`}
              className="partners__logo"
              src={currLogo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// export default function Partners() {
//   const logosRef = useRef([]);
//   const logosFirstRef = useRef([]);
//   const logosSecondRef = useRef([]);
//   const logosThirdRef = useRef([]);
//   const slider = useRef();
//   let xPercent = 0;
//   let direction = -1;

//   useGSAP(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.fromTo(slider.current, {
//       xPercent: 0
//     }, {
//       xPercent: -15,
//       scrollTrigger: {
//         trigger: slider.current,
//         scrub: 1,
//         start: 'top bottom',
//         end: 'bottom top',
//         onUpdate: (e) => (direction = e.direction * -1),
//       },
//     });
//     requestAnimationFrame(animate);
//   }, []);

//   const animate = () => {
//     if (xPercent < -117) {
//       xPercent = 0;
//     } else if (xPercent > 0) {
//       xPercent = -117;
//     }
    
//     if(logosFirstRef && logosSecondRef && logosThirdRef) {
//       gsap.set(logosFirstRef.current, { xPercent, duration: 1 });
//       gsap.set(logosSecondRef.current, { xPercent, duration: 1 });
//       gsap.set(logosThirdRef.current, { xPercent, duration: 1 });
//     }

//     requestAnimationFrame(animate);
//     xPercent += 0.1 * direction;
//   };

//   return (
//     <section className="partners">
//       <div className="partners__slider" ref={slider}>
//         <div ref={logosFirstRef}>
//           {logos.map((currLogo, i) => (
//             <img
//               alt=""
//               key={i}
//               className="partners__logo"
//               ref={(el) => logosRef.current.push(el)}
//               src={`/media/PartnersLogos/${currLogo}.png`}
//             />
//           ))}
//         </div>
//         <div ref={logosSecondRef}>
//           {logos.map((currLogo, i) => (
//             <img
//               alt=""
//               key={i}
//               className="partners__logo"
//               ref={(el) => logosRef.current.push(el)}
//               src={`/media/PartnersLogos/${currLogo}.png`}
//             />
//           ))}
//         </div>
//         <div ref={logosThirdRef}>
//           {logos.map((currLogo, i) => (
//             <img
//               alt=""
//               key={i}
//               className="partners__logo"
//               ref={(el) => logosRef.current.push(el)}
//               src={`/media/PartnersLogos/${currLogo}.png`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
