id: 11
source: 1
name: boodet_index_get_idx

-----

#<?php
/** @var modX $modx */
/** @var int $input */
$currentResource = (int) $input;
$modx->log(1, $input);

$qGetResource = $modx->newQuery('modResource', [
    'id:IN' => [24,22],
    'deleted' => 0,
    'published' => 1
]);
$qGetResource->sortby('menuindex', 'ASC');
$qGetResource->sortby('pagetitle', 'ASC');
/** @var modResource $resource */
$resource = $modx->getObject('modResource', $qGetResource);
if(!($resource instanceof modResource)) {
    return 1;
}

return ($resource->get('id') == $currentResource) ? 0 : $modx->getCount('modResource', [
    'parent' => ($currentResource == 24) ? 22 : 24,
    'published' => 1,
    'deleted' => 0
]);
