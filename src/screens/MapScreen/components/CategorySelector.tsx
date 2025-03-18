import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type PropsCategorySelector = {
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategorySelectorr = (props: PropsCategorySelector) => {
  const categories = {
    Emergencias: ["Actividad sospechosa", "Vandalismo", "Otra emergencia"],
    Preventivas: ["Luminarias", "Acera", "Semáforos", "Señalización", "Otro"],
  };

  // Maneja la selección de categoría
  const handleCategorySelect = (category: string) => {
    console.log(props.selectedCategory);
    //props.selectedCategory = category;
    props.setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una categoría</Text>

      {Object.entries(categories).map(([section, items]) => (
        <View key={section} style={styles.section}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <View style={styles.categoryContainer}>
            {items.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  props.selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => handleCategorySelect(category)}
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
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
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
