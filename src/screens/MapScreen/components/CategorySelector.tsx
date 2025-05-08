import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type PropsCategorySelector = {
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    mainCategory: "Emergencia" | "Preventiva" | null;
}

const CategorySelectorr = (props: PropsCategorySelector) => {
  const categories = {
    Emergencia: ["Actividad sospechosa", "Robo","Vandalismo", "Otro"],
    Preventiva: ["Luminarias", "Acera", "Semáforos", "Otro"],
  };

  const currentCategories = props.mainCategory ? categories[props.mainCategory] : [];
  // Maneja la selección de categoría
  const handleCategorySelect = (category: string) => {
    console.log(props.selectedCategory);
    //props.selectedCategory = category;
    props.setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>

    {props.mainCategory && (
      <View style={styles.section}>
        <View style={styles.categoryContainer}>
          {currentCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                props.selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => props.setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  props.selectedCategory === category && styles.selectedText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )}
  </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#f5f5f5",
  },
  selectedCategory: {
    backgroundColor: "cornflowerblue"
  },
  categoryText: {
    color: "#333",
    fontWeight: "bold",
  },
  selectedText: {
    color: "#fff",
  },
});

export default CategorySelectorr;
