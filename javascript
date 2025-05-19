import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { categories } from "./categories";
import sampleCard from "./sampleCard";
import FloatingCart from "./FloatingCart";

export default function POSLayout() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const canvasRef = useRef(null);

  const handleCanvasClick = () => setCartOpen(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[product.id]) {
        newCart[product.id].quantity += 1;
      } else {
        newCart[product.id] = { ...product, quantity: 1 };
      }
      return newCart;
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (!newCart[id]) return newCart;
      newCart[id].quantity += delta;
      if (newCart[id].quantity < 1) {
        delete newCart[id];
      }
      return newCart;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    draw();
  }, [cartOpen]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 relative">
      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className={`text-blue-800 bg-white border shadow-md rounded-xl px-3 py-2 hover:bg-blue-100 ${selectedCategory === cat ? 'text-red-600' : ''}`}
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <ScrollArea className="w-full mt-16 h-[calc(100vh-250px)] pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(25)].map((_, idx) => {
                  const productId = `${cat}-${idx + 1}`;
                  return (
                    <div key={idx} className="flex justify-center">
                      {sampleCard({
                        id: productId,
                        title: `${cat} Product ${idx + 1}`,
                        onAdd: addToCart,
                      })}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className={`fixed top-0 left-0 pointer-events-auto ${cartOpen ? "" : "hidden"}`}
        onClick={handleCanvasClick}
      />

      <FloatingCart
        cart={cart}
        cartOpen={cartOpen}
        changeQuantity={changeQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}
