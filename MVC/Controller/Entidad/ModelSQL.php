<?php

abstract class ModelSQL {

    public function Insert() {
        $sql = "";
        $getter_names_attr = (array) $this;
        $attr = array();
        $values = array();
        foreach ($getter_names_attr as $key => $value) {
            if (isset($value) && $key != "tabla" && $key != "Id") {
                array_push($attr, $key);
                
                if (is_bool($value)) {
                    array_push($values, "'" . ($value ? "1" : "0") . "'");
                } else {
                    array_push($values, "'" . $value . "'");
                }
            }
        }
        $sql = "INSERT INTO " . $this->tabla . "(" . join(",", $attr) . ") VALUES(" . join(",", $values) . ")";
        return $sql;
    }

    public function Update() {
        $sql = "";
        $getter_names_attr = (array) $this;
        $values = array();
        foreach ($getter_names_attr as $key => $value) {
            if (isset($value) && $key != "tabla" && $key != "Id") {
                if (is_bool($value)) {
                    //array_push($values, "'" . ($value ? "1" : "0") . "'");
                    array_push($values, $key . " = " . "'" . ($value ? "1" : "0") . "'");
                } else {
                    array_push($values, $key . " = " . "'" . $value . "'");
                }
                
            }
        }
        $sql = "UPDATE " . $this->tabla . " SET " . join(",", $values) . " WHERE ID = " . $this->Id;
        return $sql;
    }

    public function Update_Delete() {
        if (is_array($this->Id)) {
            $sql = "UPDATE " . $this->tabla . " SET estado = 'INA' WHERE ID IN (" . join(',', $this->Id) . ")";
        } else {
            $sql = "UPDATE " . $this->tabla . " SET estado = 'INA' WHERE ID = " . $this->Id;
        }

        return $sql;
    }

}
