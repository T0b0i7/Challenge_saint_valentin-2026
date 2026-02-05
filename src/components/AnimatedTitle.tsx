 import { motion, Variants } from 'framer-motion';
 
 interface AnimatedTitleProps {
   children: string;
   className?: string;
   delay?: number;
   as?: 'h1' | 'h2' | 'h3' | 'span';
 }
 
 export const AnimatedTitle = ({
   children, 
   className = '',
   delay = 0,
   as: Component = 'h1'
 }: AnimatedTitleProps) => {
   const words = children.split(' ');
 
   const containerVariants: Variants = {
     hidden: {},
     visible: {
       transition: {
         staggerChildren: 0.08,
         delayChildren: delay,
       },
     },
   };
 
   const letterVariants: Variants = {
     hidden: {
       opacity: 0,
       y: 100,
       rotate: 180,
       filter: 'blur(20px)',
       scale: 0.5,
     },
     visible: {
       opacity: 1,
       y: 0,
       rotate: 0,
       filter: 'blur(0px)',
       scale: 1,
       transition: {
         type: 'spring' as const,
         damping: 12,
         stiffness: 100,
       },
     },
   };
 
   return (
     <motion.div
       variants={containerVariants}
       initial="hidden"
       animate="visible"
       className={className}
     >
       <Component className="inline">
         {words.map((word, wordIndex) => (
           <span key={wordIndex} className="inline-block mr-[0.25em]">
             {word.split('').map((letter, letterIndex) => (
               <motion.span
                 key={`${wordIndex}-${letterIndex}`}
                 variants={letterVariants}
                 className="inline-block"
                 style={{
                   transformOrigin: 'center bottom',
                 }}
               >
                 {letter}
               </motion.span>
             ))}
           </span>
         ))}
       </Component>
     </motion.div>
   );
 };
 
 // Italic variant for special words
 export const AnimatedItalicWord = ({ 
   children, 
   delay = 0
 }: { 
   children: string; 
   delay?: number;
 }) => {
   const letterVariants: Variants = {
     hidden: {
       opacity: 0,
       y: 50,
       rotate: -90,
       scale: 0,
     },
     visible: (i: number) => ({
       opacity: 1,
       y: 0,
       rotate: 0,
       scale: 1,
       transition: {
         delay: delay + i * 0.05,
         type: 'spring' as const,
         damping: 10,
         stiffness: 120,
       },
     }),
   };
 
   return (
     <span className="italic inline-block">
       {children.split('').map((letter, i) => (
         <motion.span
           key={i}
           custom={i}
           variants={letterVariants}
           initial="hidden"
           animate="visible"
           className="inline-block"
         >
           {letter}
         </motion.span>
       ))}
     </span>
   );
 };