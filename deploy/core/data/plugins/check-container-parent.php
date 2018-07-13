id: 3
name: check_container_parent
properties: null

-----

#<?php
/** @var modX $modx */;

if($modx->resource->parent) {
    /** @var modResource $parent */
    $parent = $modx->getObject('modResource', $modx->resource->parent);
    if(!($parent instanceof modResource) || !$parent->isfolder) {
        $modx->sendErrorPage();
    }
}