import { motion } from "framer-motion";
export const Features = () => {
//   const features = [
//     "🔴 Real-time Broadcasting",
//     "🧠 AI-Assisted Messaging",
//     "📡 Scalable Communication",
//     "📲 Mobile & Web Integration",
//     "💬 Channel-based Messaging",
//   ];

  return (
    <section className="py-20 text-white bg-gradient-to-b from-transparent to-black text-center">
      <h3 className="text-4xl font-bold mb-10">Why Castify?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {/* {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <p className="text-lg font-medium">{feature}</p>
          </motion.div>
        ))} */}
      </div>
    </section>
  );
};
