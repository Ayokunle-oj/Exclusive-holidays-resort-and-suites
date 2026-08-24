import { useCallback, useState } from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faUtensils,
  faShoppingBag,
  faXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./RestaurantMenu.css";

/* ----------------------------------------------------------------
   Food data — swap the `image` paths for real photography once
   it's ready. Files are expected under /public/assets/food/... so
   a missing image never breaks the build; the card falls back to
   a soft gold placeholder with the dish icon instead.
------------------------------------------------------------------- */

type Category =
  | "Breakfast"
  | "Starters"
  | "Main Course"
  | "Rice"
  | "Pasta"
  | "Grills"
  | "Seafood"
  | "Desserts";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const foodItems: FoodItem[] = [
  // Breakfast
  {
    id: 1,
    name: "Continental Sunrise Plate",
    description:
      "Golden pancakes, crisp bacon, sautéed mushrooms and fresh seasonal fruit.",
    price: 6500,
    category: "Breakfast",
    image: "/assets/food/continental-sunrise.jpg",
  },
  {
    id: 2,
    name: "Akara & Pap",
    description: "Crisp bean cakes served with warm, silky corn pap and honey.",
    price: 4500,
    category: "Breakfast",
    image: "/assets/food/akara-pap.jpg",
  },
  {
    id: 3,
    name: "Classic Eggs Benedict",
    description:
      "Poached eggs and smoked turkey on toasted brioche, hollandaise sauce.",
    price: 7000,
    category: "Breakfast",
    image: "/assets/food/eggs-benedict.jpg",
  },

  // Starters
  {
    id: 4,
    name: "Peppered Snail Skewers",
    description:
      "Grilled bush snail glazed in a smoky pepper sauce, garden herbs.",
    price: 7500,
    category: "Starters",
    image: "/assets/food/peppered-snail.jpg",
  },
  {
    id: 5,
    name: "Suya Spring Rolls",
    description:
      "Crisp rolls filled with spiced suya beef, served with yaji dip.",
    price: 6000,
    category: "Starters",
    image: "/assets/food/suya-rolls.jpg",
  },
  {
    id: 6,
    name: "Roasted Plantain & Pepper Sauce",
    description:
      "Caramelised plantain fingers with a bright, spiced tomato ata.",
    price: 5000,
    category: "Starters",
    image: "/assets/food/plantain-pepper.jpg",
  },

  // Main Course
  {
    id: 7,
    name: "Braised Oxtail",
    description:
      "Slow-braised oxtail in rich pepper stock, served with steamed yam.",
    price: 13500,
    category: "Main Course",
    image: "/assets/food/braised-oxtail.jpg",
  },
  {
    id: 8,
    name: "Pounded Yam & Egusi",
    description:
      "Hand-pounded yam with a hearty melon-seed soup and assorted meat.",
    price: 11000,
    category: "Main Course",
    image: "/assets/food/egusi-yam.jpg",
  },
  {
    id: 9,
    name: "Herb-Crusted Chicken Supreme",
    description:
      "Free-range chicken breast, garlic herb crust, roasted root vegetables.",
    price: 12500,
    category: "Main Course",
    image: "/assets/food/herb-chicken.jpg",
  },

  // Rice
  {
    id: 10,
    name: "Jollof Rice & Chicken",
    description:
      "Fragrant smoky jollof rice served with grilled chicken and plantain.",
    price: 8500,
    category: "Rice",
    image: "/assets/food/jollof-chicken.jpg",
  },
  {
    id: 11,
    name: "Native Fried Rice",
    description:
      "Peppered fried rice with shrimp, liver and garden vegetables.",
    price: 9000,
    category: "Rice",
    image: "/assets/food/native-fried-rice.jpg",
  },
  {
    id: 12,
    name: "Coconut Basmati Rice",
    description:
      "Light coconut-infused basmati, served with grilled fish fillet.",
    price: 9500,
    category: "Rice",
    image: "/assets/food/coconut-rice.jpg",
  },

  // Pasta
  {
    id: 13,
    name: "Shrimp Alfredo Linguine",
    description:
      "Linguine in a silky parmesan cream sauce with pan-seared shrimp.",
    price: 10500,
    category: "Pasta",
    image: "/assets/food/shrimp-alfredo.jpg",
  },
  {
    id: 14,
    name: "Jollof Spaghetti Fusion",
    description:
      "Nigerian jollof spice tradition meets al dente spaghetti and beef strips.",
    price: 8000,
    category: "Pasta",
    image: "/assets/food/jollof-spaghetti.jpg",
  },

  // Grills
  {
    id: 15,
    name: "Signature Grilled Chicken",
    description:
      "Our chef's specially marinated chicken, charcoal-grilled to order.",
    price: 15000,
    category: "Grills",
    image: "/assets/food/signature-grilled-chicken.jpg",
  },
  {
    id: 16,
    name: "Peppered Beef Ribs",
    description: "Slow-grilled beef ribs finished with a fiery pepper glaze.",
    price: 14000,
    category: "Grills",
    image: "/assets/food/beef-ribs.jpg",
  },
  {
    id: 17,
    name: "Assorted Suya Platter",
    description:
      "Beef, chicken and gizzard suya, sliced onions and yaji spice.",
    price: 10000,
    category: "Grills",
    image: "/assets/food/suya-platter.jpg",
  },

  // Seafood
  {
    id: 18,
    name: "Grilled Tiger Prawns",
    description: "Jumbo prawns in garlic butter, finished over an open flame.",
    price: 16500,
    category: "Seafood",
    image: "/assets/food/tiger-prawns.jpg",
  },
  {
    id: 19,
    name: "Pan-Seared Catfish",
    description: "Crisp-skinned catfish fillet, pepper sauce, sautéed greens.",
    price: 12000,
    category: "Seafood",
    image: "/assets/food/pan-seared-catfish.jpg",
  },

  // Desserts
  {
    id: 20,
    name: "Chin Chin Crumble Tart",
    description: "Buttery chin chin crumble over spiced custard and berries.",
    price: 4500,
    category: "Desserts",
    image: "/assets/food/chinchin-tart.jpg",
  },
  {
    id: 21,
    name: "Zobo-Poached Pear",
    description: "Pear poached in hibiscus zobo syrup, vanilla mascarpone.",
    price: 5000,
    category: "Desserts",
    image: "/assets/food/zobo-pear.jpg",
  },
];

const featuredDish: FoodItem = foodItems.find((item) => item.id === 15)!;

const categories: Array<"All" | Category> = [
  "All",
  "Breakfast",
  "Starters",
  "Main Course",
  "Rice",
  "Pasta",
  "Grills",
  "Seafood",
  "Desserts",
];

const formatNaira = (value: number) => `\u20a6${value.toLocaleString("en-NG")}`;

/* ----------------------------------------------------------------
   useReveal — lightweight IntersectionObserver hook. Mirrors the
   site's existing data-reveal / ScrollAnimation pattern: toggles a
   class on enter AND removes it on exit, so the motion reverses
   naturally when the user scrolls back up.
------------------------------------------------------------------- */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const [visible, setVisible] = useState(false);

  const ref = useCallback(
    (node: T | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { threshold, rootMargin: "0px 0px -60px 0px" },
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [threshold],
  );

  return { ref, visible };
}

/* ----------------------------------------------------------------
   Food Card
------------------------------------------------------------------- */
function FoodCard({
  item,
  index,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  item: FoodItem;
  index: number;
  quantity: number;
  onAdd: (item: FoodItem) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={ref}
      className={`menu-card ${visible ? "menu-card--visible" : ""}`}
      style={{ transitionDelay: `${(index % 8) * 70}ms` }}
    >
      <div className="menu-card__image-wrap">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            className="menu-card__image"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="menu-card__placeholder">
            <FontAwesomeIcon icon={faUtensils} />
          </div>
        )}
        <span className="menu-card__category">{item.category}</span>
      </div>

      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__description">{item.description}</p>

        <div className="menu-card__footer">
          <span className="menu-card__price">{formatNaira(item.price)}</span>

          {quantity === 0 ? (
            <button
              type="button"
              className="menu-card__button"
              onClick={() => onAdd(item)}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add / Order</span>
            </button>
          ) : (
            <div className="menu-card__stepper">
              <button
                type="button"
                className="menu-card__stepper-btn"
                onClick={() => onDecrement(item.id)}
                aria-label={`Remove one ${item.name}`}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="menu-card__stepper-count">{quantity}</span>
              <button
                type="button"
                className="menu-card__stepper-btn"
                onClick={() => onIncrement(item.id)}
                aria-label={`Add one more ${item.name}`}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Cart Drawer
------------------------------------------------------------------- */
function CartDrawer({
  open,
  onClose,
  items,
  onIncrement,
  onDecrement,
  onRemove,
  total,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  total: number;
}) {
  return (
    <>
      <div
        className={`cart-backdrop ${open ? "cart-backdrop--open" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`cart-drawer ${open ? "cart-drawer--open" : ""}`}
        aria-hidden={!open}
      >
        <div className="cart-drawer__header">
          <h3 className="cart-drawer__title">Your Order</h3>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <FontAwesomeIcon icon={faShoppingBag} />
            <p>Your order is empty. Add a dish to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item__image"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.visibility =
                          "hidden";
                      }}
                    />
                  </div>

                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <span className="cart-item__unit-price">
                      {formatNaira(item.price)} each
                    </span>

                    <div className="cart-item__row">
                      <div className="cart-item__stepper">
                        <button
                          type="button"
                          className="cart-item__stepper-btn"
                          onClick={() => onDecrement(item.id)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="cart-item__stepper-count">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="cart-item__stepper-btn"
                          onClick={() => onIncrement(item.id)}
                          aria-label={`Add one more ${item.name}`}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>

                      <span className="cart-item__line-total">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name} from order`}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total-row">
                <span className="cart-drawer__total-label">Total</span>
                <span className="cart-drawer__total-value">
                  {formatNaira(total)}
                </span>
              </div>
              <p className="cart-drawer__note">
                Final bill is confirmed at the restaurant. This is a guide to
                help you plan.
              </p>
              {/* <Link
                to="/booking"
                state={{
                  reason: "restaurant",
                  cart: items,
                  cartTotal: total,
                }}
                className="cart-drawer__cta"
                onClick={onClose}
              >
                Reserve Table & Send Order
              </Link> */}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ----------------------------------------------------------------
   Cart Trigger (floating button)
------------------------------------------------------------------- */
function CartTrigger({
  count,
  total,
  onClick,
}: {
  count: number;
  total: number;
  onClick: () => void;
}) {
  return (
    <button type="button" className="cart-trigger" onClick={onClick}>
      <span className="cart-trigger__icon-wrap">
        <FontAwesomeIcon icon={faShoppingBag} />
        {count > 0 && <span className="cart-trigger__badge">{count}</span>}
      </span>
      {count > 0 && (
        <span className="cart-trigger__total">{formatNaira(total)}</span>
      )}
    </button>
  );
}

/* ----------------------------------------------------------------
   Main Section
------------------------------------------------------------------- */
export default function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const { ref: headingRef, visible: headingVisible } =
    useReveal<HTMLDivElement>();
  const { ref: navRef, visible: navVisible } = useReveal<HTMLDivElement>(0.3);
  const { ref: featuredRef, visible: featuredVisible } =
    useReveal<HTMLDivElement>();

  const visibleItems =
    activeCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === activeCategory);

  const quantityOf = (id: number) =>
    cart.find((c) => c.id === id)?.quantity ?? 0;

  const addToCart = (item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const incrementItem = (id: number) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)),
    );
  };

  const decrementItem = (id: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <section className="menu-section" id="restaurant">
      <div className="menu-container">
        {/* Header */}
        <div
          ref={headingRef}
          className={`menu-header ${headingVisible ? "menu-header--visible" : ""}`}
        >
          <span className="menu-eyebrow">Our Restaurant</span>
          <h2 className="menu-title">Taste the Experience</h2>
          <p className="menu-subtitle">
            Explore our carefully prepared selection of dishes, made to give you
            an unforgettable dining experience.
          </p>
        </div>

        {/* Featured Dish */}
        <div
          ref={featuredRef}
          className={`menu-featured ${featuredVisible ? "menu-featured--visible" : ""}`}
        >
          <div className="menu-featured__image-wrap">
            {featuredDish.image ? (
              <img
                src={featuredDish.image}
                alt={featuredDish.name}
                className="menu-featured__image"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : null}
          </div>
          <div className="menu-featured__content">
            <span className="menu-featured__eyebrow">Chef's Special</span>
            <h3 className="menu-featured__name">{featuredDish.name}</h3>
            <p className="menu-featured__description">
              {featuredDish.description} Prepared fresh, to order, by our
              executive chef.
            </p>
            <span className="menu-featured__price">
              {formatNaira(featuredDish.price)}
            </span>

            {quantityOf(featuredDish.id) === 0 ? (
              <button
                type="button"
                className="menu-featured__button"
                onClick={() => addToCart(featuredDish)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Add to Order</span>
              </button>
            ) : (
              <div className="menu-featured__stepper">
                <button
                  type="button"
                  className="menu-featured__stepper-btn"
                  onClick={() => decrementItem(featuredDish.id)}
                  aria-label={`Remove one ${featuredDish.name}`}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="menu-featured__stepper-count">
                  {quantityOf(featuredDish.id)}
                </span>
                <button
                  type="button"
                  className="menu-featured__stepper-btn"
                  onClick={() => incrementItem(featuredDish.id)}
                  aria-label={`Add one more ${featuredDish.name}`}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Navigation */}
        <div
          ref={navRef}
          className={`menu-nav ${navVisible ? "menu-nav--visible" : ""}`}
        >
          <div className="menu-nav__scroll">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`menu-nav__item ${
                  activeCategory === category ? "menu-nav__item--active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Grid */}
        <div className="menu-grid">
          {visibleItems.map((item, index) => (
            <FoodCard
              key={item.id}
              item={item}
              index={index}
              quantity={quantityOf(item.id)}
              onAdd={addToCart}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="menu-cta">
          {/* <Link
            to="/booking"
            state={{ reason: "restaurant" }}
            className="menu-cta__button"
          >
            Reserve a Table
          </Link> */}
        </div>
      </div>

      {/* Floating cart trigger + drawer */}
      <CartTrigger
        count={totalItems}
        total={totalPrice}
        onClick={() => setCartOpen(true)}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
        total={totalPrice}
      />
    </section>
  );
}
